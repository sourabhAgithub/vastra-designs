export async function POST(req: Request) {
  const body = await req.json();

  await fetch(
    "https://script.google.com/macros/s/AKfycbwnwJTywnNsSGlHFW2R4kHkfskrI7Q6TVz4E9SdwvJSKB1pY0wOIzj49CJCQDQW8a3_/exec",
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );

  return Response.json({ success: true });
}
