
"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState(null);

  const submit = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div>
      <h1>Pastebin Lite</h1>
      <textarea onChange={e => setContent(e.target.value)} />
      <button onClick={submit}>Create Paste</button>
      {url && <p>Share: <a href={url}>{url}</a></p>}
    </div>
  );
}
