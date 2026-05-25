import { sql, ensureTable } from "./_db.js";
import { generateId } from "./_id.js";

const MAX_RETRIES = 5;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    await ensureTable();
    const { content, lang } = req.body ?? {};
    if (typeof content !== "string") {
      return res.status(400).json({ error: "content must be a string" });
    }
    const language = typeof lang === "string" ? lang : null;

    // Random IDs may collide once in ~32^6 inserts. Retry a few times then give up.
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const id = generateId(6);
      try {
        await sql`
          INSERT INTO snippets (id, data, lang)
          VALUES (${id}, ${content}, ${language})
        `;
        return res.status(200).json({ id, createdAt: new Date().toISOString() });
      } catch (err) {
        if (err?.code === "23505") continue; // unique_violation, try a new id
        throw err;
      }
    }
    return res.status(500).json({ error: "Failed to allocate a unique id" });
  } catch (err) {
    console.error("generate_context error:", err);
    return res.status(500).json({ error: "Database query error" });
  }
}
