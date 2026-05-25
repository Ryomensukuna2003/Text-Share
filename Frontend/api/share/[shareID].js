import { sql, ensureTable } from "../_db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    await ensureTable();
    const { shareID } = req.query;
    const rows = await sql`
      SELECT data FROM Instance WHERE id = ${shareID}
    `;
    if (rows.length === 0) {
      return res.status(404).json({ error: "No rows found" });
    }
    return res.status(200).json(rows[0].data);
  } catch (err) {
    console.error("share error:", err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
