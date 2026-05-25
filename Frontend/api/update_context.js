import { sql, ensureTable } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    await ensureTable();
    const { content, shareID } = req.body ?? {};
    if (typeof content !== "string" || shareID == null) {
      return res
        .status(400)
        .json({ error: "content and shareID are required" });
    }
    const rows = await sql`
      UPDATE Instance
      SET data = ${content}, updated_at = NOW()
      WHERE id = ${shareID}
      RETURNING id
    `;
    if (rows.length === 0) {
      return res.status(404).json({ error: "No rows updated" });
    }
    return res.status(200).json({ message: "Row updated successfully" });
  } catch (err) {
    console.error("update_context error:", err);
    return res.status(500).json({ error: "Failed to update context" });
  }
}
