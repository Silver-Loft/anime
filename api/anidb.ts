export default async function handler(req: any, res: any) {
  // Support both req.query (Vercel Node) and req.url parsing
  let aid = "1";
  if (req.query && req.query.aid) {
    aid = String(req.query.aid);
  } else if (req.url) {
    const parsed = new URL(req.url, "http://localhost");
    aid = parsed.searchParams.get("aid") || "1";
  }

  const url = new URL("http://api.anidb.net:9001/httpapi");
  url.searchParams.set("request", "anime");
  url.searchParams.set("client", "silverloft");
  url.searchParams.set("clientver", "1");
  url.searchParams.set("protover", "1");
  url.searchParams.set("aid", aid);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: "text/xml, application/xml, */*",
        "User-Agent": "silverloft/1.0",
      },
    });

    const xml = await response.text();
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    return res.status(200).send(xml);
  } catch (err: any) {
    return res.status(500).send(`<error>${err.message}</error>`);
  }
}
