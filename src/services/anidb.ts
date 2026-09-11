import { parseAniDbXml, type ParsedAnimeData } from "../utils/parseAniDbXml";

const CACHE_KEY_PREFIX = "anidb_xml_cache_";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache to respect AniDB API rate limits

interface CacheEntry {
  timestamp: number;
  xmlData: string;
}

/**
 * Fetches anime XML data from AniDB HTTP API using the exact specified parameters:
 *
 *   const url = new URL("http://api.anidb.net:9001/httpapi");
 *   url.searchParams.set("request", "anime");
 *   url.searchParams.set("client", "silverloft");
 *   url.searchParams.set("clientver", "1");
 *   url.searchParams.set("protover", "1");
 *   url.searchParams.set("aid", aid.toString());
 *
 *   fetch(url)
 *     .then(res => res.text())
 *     .then(xmlData => console.log(xmlData));
 */
export async function fetchAniDbAnime(
  aid: number = 1,
  forceRefresh: boolean = false
): Promise<{ data: ParsedAnimeData; xmlData: string; source: "live-direct" | "live-proxy" | "cache" }> {
  const cacheKey = `${CACHE_KEY_PREFIX}${aid}`;

  // Check cache first to respect AniDB's strict ban policy on rapid requests
  if (!forceRefresh && typeof window !== "undefined") {
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const entry: CacheEntry = JSON.parse(cached);
        if (Date.now() - entry.timestamp < CACHE_TTL_MS) {
          console.log(`[AniDB] Loaded aid=${aid} from session cache:`, entry.xmlData.slice(0, 200));
          const parsed = parseAniDbXml(entry.xmlData);
          return { data: parsed, xmlData: entry.xmlData, source: "cache" };
        }
      }
    } catch (e) {
      console.warn("[AniDB] Cache read error:", e);
    }
  }

  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
  let xmlData: string | null = null;
  let source: "live-direct" | "live-proxy" | "cache" = "live-direct";

  // 1. If running on HTTPS (e.g. Vercel deployment), browsers block http:// mixed content.
  // We use our Vercel /api/anidb serverless proxy to securely fetch AniDB over HTTPS.
  if (isHttps) {
    try {
      const vercelUrl = new URL("/api/anidb", window.location.origin);
      vercelUrl.searchParams.set("request", "anime");
      vercelUrl.searchParams.set("client", "silverloft");
      vercelUrl.searchParams.set("clientver", "1");
      vercelUrl.searchParams.set("protover", "1");
      vercelUrl.searchParams.set("aid", aid.toString());

      console.log(`[AniDB] HTTPS detected (Vercel). Fetching via /api/anidb for aid=${aid}...`);
      const res = await fetch(vercelUrl.toString());
      if (res.ok) {
        xmlData = await res.text();
        source = "live-proxy";
        // Required console.log as specified in user request:
        console.log(xmlData);
      }
    } catch (err) {
      console.warn("[AniDB] Vercel HTTPS proxy failed, trying fallbacks...", err);
    }
  }

  // 2. Direct URL as requested (works on http://localhost)
  if (!xmlData) {
    const url = new URL("http://api.anidb.net:9001/httpapi");
    url.searchParams.set("request", "anime");
    url.searchParams.set("client", "silverloft");
    url.searchParams.set("clientver", "1");
    url.searchParams.set("protover", "1");
    url.searchParams.set("aid", aid.toString());

    console.log(`[AniDB] Fetching real data for aid=${aid} from ${url.toString()}...`);

    try {
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Accept: "text/xml, application/xml, */*",
        },
      });

      if (!res.ok) {
        throw new Error(`AniDB direct fetch responded with HTTP ${res.status} ${res.statusText}`);
      }

      xmlData = await res.text();
      // Required console.log as specified in user request:
      console.log(xmlData);
    } catch (directError) {
      console.warn("[AniDB] Direct fetch failed. Trying proxies and local cache...", directError);

      // 3. Try /api/anidb or Vite dev server proxy (/anidb-api/httpapi)
      const proxies = ["/api/anidb", "/anidb-api/httpapi"];
      for (const proxyPath of proxies) {
        try {
          const proxyUrl = new URL(proxyPath, window.location.origin);
          proxyUrl.searchParams.set("request", "anime");
          proxyUrl.searchParams.set("client", "silverloft");
          proxyUrl.searchParams.set("clientver", "1");
          proxyUrl.searchParams.set("protover", "1");
          proxyUrl.searchParams.set("aid", aid.toString());

          const res = await fetch(proxyUrl.toString());
          if (res.ok) {
            xmlData = await res.text();
            source = "live-proxy";
            console.log(xmlData);
            break;
          }
        } catch {
          // try next proxy
        }
      }

      // 4. Bundled fallback XML if network fails
      if (!xmlData) {
        try {
          const localRes = await fetch(`/anidb_aid${aid}.xml`);
          if (localRes.ok) {
            xmlData = await localRes.text();
            source = "cache";
            console.log(xmlData);
          }
        } catch {
          // ignore
        }
      }

      if (!xmlData) {
        throw new Error("Unable to fetch AniDB data. Please check network connection.");
      }
    }
  }

  // Verify it is not an AniDB API error response (e.g. <error>Banned</error>)
  if (xmlData.includes("<error>")) {
    const errorMatch = xmlData.match(/<error>([\s\S]*?)<\/error>/);
    const errText = errorMatch ? errorMatch[1].trim() : "Unknown AniDB error";
    console.error("[AniDB] API returned error:", errText);
    throw new Error(`AniDB API Error: ${errText}`);
  }

  // Cache response in sessionStorage
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), xmlData })
      );
    } catch (e) {
      console.warn("[AniDB] Cache write error:", e);
    }
  }

  const parsed = parseAniDbXml(xmlData);
  return { data: parsed, xmlData, source };
}
