import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "messages.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (req.method === "GET") {
    // Ambil semua ucapan
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Nama dan ucapan wajib diisi" });
    }

    const newMsg = {
      id: Date.now(),
      name,
      message
    };

    data.push(newMsg);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ success: true, msg: newMsg });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
