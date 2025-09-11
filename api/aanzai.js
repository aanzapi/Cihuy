// api/aanzai.js
export default async function handler(req, res) {
  const { query, mode } = req.query;

  try {
    let apiRes;
    if (mode === "video") {
      apiRes = await fetch("https://api.sxtream.xyz/ai/texttovideo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
    } else {
      apiRes = await fetch(`https://api.sxtream.xyz/ai/luminai?query=${encodeURIComponent(query)}`);
    }

    const data = await apiRes.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (e) {
    res.status(500).json({ error: "Proxy error", details: e.message });
  }
}
