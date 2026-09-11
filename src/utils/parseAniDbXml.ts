import {
  RECORD as DEFAULT_RECORD,
  RATINGS as DEFAULT_RATINGS,
  CHARACTERS as DEFAULT_CHARACTERS,
  REGISTRY as DEFAULT_REGISTRY,
  EPISODES as DEFAULT_EPISODES,
  TAG_GROUPS as DEFAULT_TAG_GROUPS,
  SIMILAR as DEFAULT_SIMILAR,
  VOICES as DEFAULT_VOICES,
  LINEAGE as DEFAULT_LINEAGE,
  CREATORS as DEFAULT_CREATORS,
  RESOURCES as DEFAULT_RESOURCES,
  type Character,
  type Episode,
  type Voice,
} from "../data/anime";

export interface ParsedAnimeData {
  record: typeof DEFAULT_RECORD;
  ratings: Array<{ kind: string; value: number; count: number; note: string }>;
  characters: Character[];
  registry: Array<{ name: string; kind: string; rating: number; note: string }>;
  episodes: Episode[];
  tagGroups: Array<{
    label: string;
    note: string;
    tags: Array<{ name: string; weight: number }>;
  }>;
  similar: Array<{
    id: number;
    title: string;
    alias: string | null;
    approval: number;
    total: number;
  }>;
  voices: Voice[];
  lineage: Array<{
    id: number;
    relation: string;
    title: string;
    note: string;
    current: boolean;
  }>;
  creators: Array<{ role: string; name: string; id: number }>;
  resources: Array<{ label: string; href: string; meta: string }>;
  rawXml?: string;
}

const KNOWN_IMAGES: Record<number, string> = {
  28: "images/char-lafiel.jpg",
  4081: "images/char-jinto.jpg",
  4084: "images/char-spoor.jpg",
  4080: "images/char-lexshu.jpg",
};

const KNOWN_BARONH: Record<number, string> = {
  28: "ABLÏARSEC NÉÏC DUBREUSCR BŒRH PARHYNR LAMHIRH",
  4081: "LINN SSYUN-ROC DREU HAÏDEC GHINTEC",
  4084: "SPOOR ARON SEKPADAO LETOPANYU PENEJU",
  4080: "LEXSHU WEF-ROBELL PLAKIA",
};

export function parseAniDbXml(xmlStr: string): ParsedAnimeData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlStr, "application/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    console.error("XML parse error detected:", parseError.textContent);
    throw new Error("Unable to parse AniDB XML response");
  }

  const animeEl = doc.querySelector("anime");
  if (!animeEl) {
    throw new Error("Invalid AniDB XML: <anime> root element missing");
  }

  const aid = parseInt(animeEl.getAttribute("id") || "1", 10);

  // Titles
  const titleEls = Array.from(doc.querySelectorAll("titles > title"));
  const titles = titleEls.map((el) => ({
    lang: el.getAttribute("xml:lang") || el.getAttribute("lang") || "",
    type: el.getAttribute("type") || "",
    text: el.textContent?.trim() || "",
  }));

  const mainTitle =
    titles.find((t) => t.type === "main")?.text || DEFAULT_RECORD.mainTitle;
  const enTitle =
    titles.find((t) => t.lang === "en" && t.type === "official")?.text ||
    titles.find((t) => t.lang === "en")?.text ||
    DEFAULT_RECORD.enTitle;
  const jaTitle =
    titles.find((t) => t.lang === "ja" && t.type === "official")?.text ||
    titles.find((t) => t.lang === "ja")?.text ||
    DEFAULT_RECORD.jaTitle;
  const csTitle =
    titles.find((t) => t.lang === "cs")?.text || DEFAULT_RECORD.csTitle;
  const zhTitle =
    titles.find((t) => t.lang?.startsWith("zh"))?.text || DEFAULT_RECORD.zhTitle;
  const shortEn =
    titles.find((t) => t.lang === "en" && t.type === "short")?.text ||
    DEFAULT_RECORD.shortEn;
  const shortJat =
    titles.find((t) => t.lang === "x-jat" && t.type === "short")?.text ||
    DEFAULT_RECORD.shortJat;

  // Metadata
  const type =
    doc.querySelector("anime > type")?.textContent?.trim() ||
    DEFAULT_RECORD.type;
  const epCountRaw = doc
    .querySelector("anime > episodecount")
    ?.textContent?.trim();
  const episodeCount = epCountRaw
    ? parseInt(epCountRaw, 10)
    : DEFAULT_RECORD.episodeCount;
  const startDate =
    doc.querySelector("anime > startdate")?.textContent?.trim() ||
    DEFAULT_RECORD.startDate;
  const endDate =
    doc.querySelector("anime > enddate")?.textContent?.trim() ||
    DEFAULT_RECORD.endDate;
  const year = startDate
    ? new Date(startDate).getFullYear() || DEFAULT_RECORD.year
    : DEFAULT_RECORD.year;
  const officialUrl =
    doc.querySelector("anime > url")?.textContent?.trim() ||
    DEFAULT_RECORD.officialUrl;

  // Description
  const rawDesc = doc.querySelector("anime > description")?.textContent || "";
  const cleanDesc = rawDesc
    .replace(/https?:\/\/[^\s\[\]]+\s+\[([^\]]+)\]/g, "$1")
    .replace(/\[i\]([\s\S]*?)\[\/i\]/g, "$1")
    .replace(/\[b\]([\s\S]*?)\[\/b\]/g, "$1")
    .replace(/`/g, "'")
    .trim();

  const descParagraphs = cleanDesc
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const basedOnMatch = descParagraphs.find((p) =>
    p.toLowerCase().includes("based on")
  );
  const basedOn = basedOnMatch
    ? basedOnMatch.replace(/^\*\s*/, "")
    : DEFAULT_RECORD.basedOn;

  const narrativeParagraphs = descParagraphs.filter(
    (p) => !p.toLowerCase().includes("based on")
  );
  const description = narrativeParagraphs[0] || DEFAULT_RECORD.description;
  const description2 =
    narrativeParagraphs.slice(1).join(" ") || DEFAULT_RECORD.description2;

  const record = {
    anidbId: aid,
    mainTitle,
    enTitle,
    jaTitle,
    csTitle,
    zhTitle,
    shortEn,
    shortJat,
    type,
    episodeCount,
    startDate,
    endDate,
    year,
    officialUrl,
    studio: DEFAULT_RECORD.studio,
    description,
    description2,
    basedOn,
  };

  // Ratings
  const permEl = doc.querySelector("ratings > permanent");
  const tempEl = doc.querySelector("ratings > temporary");
  const revEl = doc.querySelector("ratings > review");

  const ratings = [
    {
      kind: "PERMANENT",
      value: permEl
        ? parseFloat(permEl.textContent || "0")
        : DEFAULT_RATINGS[0].value,
      count: permEl
        ? parseInt(permEl.getAttribute("count") || "0", 10)
        : DEFAULT_RATINGS[0].count,
      note: DEFAULT_RATINGS[0].note,
    },
    {
      kind: "TEMPORARY",
      value: tempEl
        ? parseFloat(tempEl.textContent || "0")
        : DEFAULT_RATINGS[1].value,
      count: tempEl
        ? parseInt(tempEl.getAttribute("count") || "0", 10)
        : DEFAULT_RATINGS[1].count,
      note: DEFAULT_RATINGS[1].note,
    },
    {
      kind: "REVIEW",
      value: revEl
        ? parseFloat(revEl.textContent || "0")
        : DEFAULT_RATINGS[2].value,
      count: revEl
        ? parseInt(revEl.getAttribute("count") || "0", 10)
        : DEFAULT_RATINGS[2].count,
      note: DEFAULT_RATINGS[2].note,
    },
  ];

  // Characters & Registry
  const charEls = Array.from(doc.querySelectorAll("characters > character"));
  const parsedCharacters: Character[] = [];
  const parsedRegistry: Array<{
    name: string;
    kind: string;
    rating: number;
    note: string;
  }> = [];

  charEls.forEach((el) => {
    const id = parseInt(el.getAttribute("id") || "0", 10);
    const typeAttr = (el.getAttribute("type") || "").toLowerCase();
    const name = el.querySelector("name")?.textContent?.trim() || "";
    const gender = el.querySelector("gender")?.textContent?.trim() || "unknown";
    const ctype =
      el.querySelector("charactertype")?.textContent?.trim() || "Character";
    const ratingEl = el.querySelector("rating");
    const rating = ratingEl ? parseFloat(ratingEl.textContent || "0") : 0;
    const votes = ratingEl
      ? parseInt(ratingEl.getAttribute("votes") || "0", 10)
      : 0;
    const seiyuu = el.querySelector("seiyuu")?.textContent?.trim();
    const rawBlurb = el.querySelector("description")?.textContent || "";
    const blurb = rawBlurb
      .replace(/https?:\/\/[^\s\[\]]+\s+\[([^\]]+)\]/g, "$1")
      .replace(/`/g, "'")
      .trim();

    if (ctype === "Character" && rating > 0) {
      let role: "MAIN" | "SECONDARY" | "APPEARS" = "APPEARS";
      if (typeAttr.includes("main character")) role = "MAIN";
      else if (typeAttr.includes("secondary cast")) role = "SECONDARY";

      // Human-friendly short name for display
      let displayName = name;
      if (id === 28) displayName = "Lafiel";
      else if (id === 4081) displayName = "Jinto";
      else if (id === 4084) displayName = "Spoor";
      else if (id === 4082) displayName = "Dusanyu";
      else if (id === 4083) displayName = "Trife Remsale";
      else if (id === 4079) displayName = "Debeus";
      else if (id === 4086) displayName = "Srguf";
      else if (id === 4085) displayName = "Klowal";
      else if (id === 21954) displayName = "Ramaj";

      const defaultChar = DEFAULT_CHARACTERS.find((c) => c.id === id);

      parsedCharacters.push({
        id,
        name: displayName,
        baronh: KNOWN_BARONH[id] || defaultChar?.baronh,
        role,
        rating,
        votes,
        gender,
        type: ctype,
        seiyuu: seiyuu || defaultChar?.seiyuu,
        blurb:
          blurb.length > 280
            ? blurb.slice(0, 277) + "..."
            : blurb || defaultChar?.blurb || `${displayName} from ${mainTitle}`,
        image:
          KNOWN_IMAGES[id] ||
          defaultChar?.image ||
          (el.querySelector("picture")?.textContent
            ? `https://cdn-eu.anidb.net/images/main/${el.querySelector("picture")?.textContent}`
            : undefined),
      });
    } else if (ctype !== "Character") {
      let kind = "VESSEL";
      if (
        ctype.toLowerCase().includes("organization") ||
        name.toLowerCase().includes("planet") ||
        name.toLowerCase().includes("martine")
      ) {
        kind =
          name.toLowerCase().includes("empire") ||
          name.toLowerCase().includes("teikoku")
            ? "EMPIRE"
            : "PLANET";
      }

      const defaultReg = DEFAULT_REGISTRY.find((r) => r.name === name);

      parsedRegistry.push({
        name,
        kind: defaultReg?.kind || kind,
        rating: rating || defaultReg?.rating || 0,
        note:
          blurb.length > 120
            ? blurb.slice(0, 117) + "..."
            : blurb || defaultReg?.note || `${ctype} in ${mainTitle}`,
      });
    }
  });

  // Sort characters: main first by rating, then secondary by rating, then appears
  const sortedCharacters = [
    ...parsedCharacters
      .filter((c) => c.role === "MAIN")
      .sort((a, b) => b.rating - a.rating),
    ...parsedCharacters
      .filter((c) => c.role === "SECONDARY")
      .sort((a, b) => b.rating - a.rating),
    ...parsedCharacters
      .filter((c) => c.role === "APPEARS")
      .sort((a, b) => b.rating - a.rating),
  ];

  // Episodes
  const epEls = Array.from(doc.querySelectorAll("episodes > episode"));
  const episodes: Episode[] = [];

  epEls.forEach((el) => {
    const epnoEl = el.querySelector("epno");
    if (!epnoEl || epnoEl.getAttribute("type") !== "1") return; // type 1 = standard TV episodes
    const no = parseInt(epnoEl.textContent || "0", 10);
    const length = parseInt(
      el.querySelector("length")?.textContent || "25",
      10
    );
    const air = el.querySelector("airdate")?.textContent?.trim() || "";
    const ratingEl = el.querySelector("rating");
    const rating = ratingEl ? parseFloat(ratingEl.textContent || "0") : 0;
    const votes = ratingEl
      ? parseInt(ratingEl.getAttribute("votes") || "0", 10)
      : 0;

    const titles = Array.from(el.querySelectorAll("title")).map((t) => ({
      lang: t.getAttribute("xml:lang") || "",
      text: t.textContent?.trim() || "",
    }));

    const en = titles.find((t) => t.lang === "en")?.text || `Episode ${no}`;
    const ja = titles.find((t) => t.lang === "ja")?.text || "";
    const romaji = titles.find((t) => t.lang === "x-jat")?.text || "";

    episodes.push({
      no,
      en,
      ja,
      romaji,
      air,
      length,
      rating,
      votes,
    });
  });
  episodes.sort((a, b) => a.no - b.no);

  // Tags
  const tagEls = Array.from(doc.querySelectorAll("tags > tag"));
  const tagWeightsMap = new Map<string, number>();
  tagEls.forEach((t) => {
    const name = t.querySelector("name")?.textContent?.trim().toLowerCase();
    const weight = parseInt(t.getAttribute("weight") || "0", 10);
    if (name) tagWeightsMap.set(name, weight);
  });

  const tagGroups = DEFAULT_TAG_GROUPS.map((g) => ({
    ...g,
    tags: g.tags.map((t) => ({
      ...t,
      weight: tagWeightsMap.has(t.name.toLowerCase())
        ? tagWeightsMap.get(t.name.toLowerCase())!
        : t.weight,
    })),
  }));

  // Similar anime
  const simEls = Array.from(doc.querySelectorAll("similaranime > anime"));
  const similar = simEls.map((el) => {
    const id = parseInt(el.getAttribute("id") || "0", 10);
    const approval = parseInt(el.getAttribute("approval") || "0", 10);
    const total = parseInt(el.getAttribute("total") || "0", 10);
    const title = el.textContent?.trim() || "";

    const defaultSim = DEFAULT_SIMILAR.find((s) => s.id === id);
    return {
      id,
      title,
      alias: defaultSim?.alias || null,
      approval,
      total,
    };
  });

  // Related anime / Lineage
  const relEls = Array.from(doc.querySelectorAll("relatedanime > anime"));
  const related = relEls.map((el) => {
    const id = parseInt(el.getAttribute("id") || "0", 10);
    const relation = (el.getAttribute("type") || "RELATED").toUpperCase();
    const title = el.textContent?.trim() || "";
    const defaultItem = DEFAULT_LINEAGE.find((l) => l.id === id);
    return {
      id,
      relation,
      title,
      note: defaultItem?.note || `${relation} story`,
      current: false,
    };
  });

  const currentLineageItem = {
    id: aid,
    relation: "THIS RECORD",
    title: mainTitle,
    note: `${enTitle} · ${year} · ${episodeCount} episodes`,
    current: true,
  };

  const prequels = related.filter((r) => r.relation.includes("PREQUEL"));
  const sequels = related.filter((r) => r.relation.includes("SEQUEL"));
  const others = related.filter(
    (r) => !r.relation.includes("PREQUEL") && !r.relation.includes("SEQUEL")
  );
  const lineage = [...prequels, currentLineageItem, ...sequels, ...others];

  // Creators
  const creatorEls = Array.from(doc.querySelectorAll("creators > name"));
  const creators = creatorEls.map((el) => ({
    id: parseInt(el.getAttribute("id") || "0", 10),
    role: el.getAttribute("type") || "Staff",
    name: el.textContent?.trim() || "",
  }));

  // Resources
  const resEls = Array.from(doc.querySelectorAll("resources > resource"));
  const resources: Array<{ label: string; href: string; meta: string }> = [];

  if (officialUrl) {
    let meta = "sunrise-inc.co.jp";
    try {
      meta = new URL(officialUrl).hostname.replace(/^www\./, "");
    } catch {}
    resources.push({
      label: "Official Site",
      href: officialUrl,
      meta,
    });
  }

  resEls.forEach((r) => {
    const type = r.getAttribute("type");
    const identifier = r.querySelector("identifier")?.textContent?.trim();
    if (!identifier) return;

    if (type === "1") {
      resources.push({
        label: "Anime News Network",
        href: `https://www.animenewsnetwork.com/encyclopedia/anime.php?id=${identifier}`,
        meta: `ANN №${identifier}`,
      });
    } else if (type === "2") {
      resources.push({
        label: "MyAnimeList",
        href: `https://myanimelist.net/anime/${identifier}`,
        meta: `MAL №${identifier}`,
      });
    } else if (type === "6") {
      resources.push({
        label: "Wikipedia",
        href: `https://en.wikipedia.org/wiki/${identifier}`,
        meta: identifier,
      });
    }
  });

  return {
    record,
    ratings,
    characters: sortedCharacters.length ? sortedCharacters : DEFAULT_CHARACTERS,
    registry: parsedRegistry.length ? parsedRegistry : Array.from(DEFAULT_REGISTRY),
    episodes: episodes.length ? episodes : DEFAULT_EPISODES,
    tagGroups,
    similar: similar.length ? similar : Array.from(DEFAULT_SIMILAR),
    voices: DEFAULT_VOICES,
    lineage: lineage.length ? lineage : Array.from(DEFAULT_LINEAGE),
    creators: creators.length ? creators : Array.from(DEFAULT_CREATORS),
    resources: resources.length ? resources : Array.from(DEFAULT_RESOURCES),
    rawXml: xmlStr,
  };
}
