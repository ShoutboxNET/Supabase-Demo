import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SHOUTBOX_API_KEY = Deno.env.get("SHOUTBOX_API_KEY");

const handler = async (_request: Request): Promise<Response> => {
  const res = await fetch("https://api.shoutbox.net/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SHOUTBOX_API_KEY}`,
    },
    body: JSON.stringify({
      from: "no-reply@shoutbox.net",
      to: "hello@example.com",
      subject: "hello world",
      html: "<strong>it works!</strong>",
    }),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

serve(handler);
