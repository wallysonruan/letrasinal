export async function request(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
): Promise<unknown> {
  try {
    return await fetch(url, {
      method: method,
    }).then((res) => res.json());
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function get(url: string) {
  return await request(url, "GET");
}
