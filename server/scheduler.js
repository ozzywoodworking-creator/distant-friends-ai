import OpenAI from "openai";
import fetch from "node-fetch";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateImage(prompt) {
  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024"
  });

  const image_url = response.data[0].url;
  console.log("✅ Generated image:", image_url);
  return image_url;
}

async function postToMastodon(text) {
  const token = process.env.MASTODON_ACCESS_TOKEN;
  const apiUrl = process.env.MASTODON_API || "https://mastodon.social/api/v1/statuses";

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: text })
  });

  if (res.ok) {
    console.log("✅ Posted to Mastodon!");
  } else {
    console.error("❌ Failed to post:", await res.text());
  }
}

async function runScheduler() {
  const img = await generateImage("A cute cartoon of two friends across the world waving at each other");
  await postToMastodon(`Hello from 🌍 Distant Friends AI! Here's our image: ${img}`);
}

runScheduler();
