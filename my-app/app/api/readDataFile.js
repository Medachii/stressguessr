// The word list is a static file in public/, so it works on Vercel without a server
export async function Read() {
    const response = await fetch('/data.txt');
    return response.text();
  }
