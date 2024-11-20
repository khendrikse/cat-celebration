import { Config, Context } from "@netlify/functions";
import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export default async function handler(req: Request, context: Context) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method === "GET") {
    const comments = await db.execute(`
      SELECT * FROM comments 
      ORDER BY created_at DESC 
      LIMIT 100
    `);
    
    return new Response(JSON.stringify(comments.rows), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  if (req.method === "POST") {
    const { name, comment } = await req.json();
    
    if (!name || !comment) {
      return new Response("Name and comment are required", { status: 400 });
    }

    await db.execute({
      sql: "INSERT INTO comments (name, comment) VALUES (?, ?)",
      args: [name, comment],
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response("Method not allowed", { status: 405 });
}

export const config: Config = {
  path: "/api/comments",
};