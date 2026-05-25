import { sql, ensureTable } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    await ensureTable();
    const { content } = req.body ?? {};
    if (typeof content !== "string") {
      return res.status(400).json({ error: "content must be a string" });
    }
    const rows = await sql`
      INSERT INTO Instance (data) VALUES (${content}) RETURNING id
    `;
    return res.status(200).json({ id: rows[0].id });
  } catch (err) {
    console.error("generate_context error:", err);
    return res.status(500).json({ error: "Database query error" });
  }
}
