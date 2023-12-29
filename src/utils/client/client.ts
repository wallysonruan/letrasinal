const SIGN_PUDDLE_SERVER = "https://signpuddle.net/";

export async function request(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
): Promise<unknown> {
  try {
    return await fetch(url, {
      method: method,
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}

export async function get(url: string) {
  return await request(url, "GET");
}

export async function getSignsByWord(word: string) {
  const url = `${SIGN_PUDDLE_SERVER}puddle/sgn46/search/${word}`;
  return await get(url).then((res) => res);
}
