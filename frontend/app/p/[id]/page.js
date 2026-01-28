
async function getPaste(id) {
  const res = await fetch(process.env.NEXT_PUBLIC_API + "/api/pastes/" + id, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function PastePage({ params }) {
  const data = await getPaste(params.id);
  if (!data) return <h1>404 - Paste not found</h1>;
  return <pre>{data.content}</pre>;
}
