import { sql, ensureTable } from "../_db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    await ensureTable();
    const { shareID } = req.query;
    if (typeof shareID !== "string" || !shareID) {
      return res.status(400).json({ error: "shareID is required" });
    }
    const rows = await sql`
      SELECT data, lang, created_at, updated_at
      FROM snippets WHERE id = ${shareID}
    `;
    if (rows.length === 0) {
      return res.status(404).json({ error: "No rows found" });
    }
    const row = rows[0];
    return res.status(200).json({
      data: row.data,
      lang: row.lang,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  } catch (err) {
    console.error("share error:", err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
