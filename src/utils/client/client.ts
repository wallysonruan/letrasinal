const SIGN_PUDDLE_SERVER = "https://signpuddle.net";
const CASE_INSENSITIVE = 1;
const SORT_BY_DESCENDING_ORDER = "-";
const SORT_BY_CREATED_AT = "created_at";
const DEFAULT_FLAGS = `sort=${SORT_BY_DESCENDING_ORDER}${SORT_BY_CREATED_AT}&ci=${CASE_INSENSITIVE}`;

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

export enum SignPuddleMatch {
  Start = "start",
  End = "end",
  Exact = "exact",
  Anywhere = "any",
}

export async function getSignsByWord(
  word: string,
  match: SignPuddleMatch = SignPuddleMatch.Start,
) {
  const inputAsUrlParam = encodeURIComponent(word);
  const url = `${SIGN_PUDDLE_SERVER}/puddle/sgn46/search/${inputAsUrlParam}?match=${match}&${DEFAULT_FLAGS}`;
  return await get(url).then((res) => res);
}

export async function getSignsByTerm(
  term: string,
  match: SignPuddleMatch = SignPuddleMatch.Start,
) {
  const inputAsUrlParam = encodeURIComponent(term);

  const url = `${SIGN_PUDDLE_SERVER}/puddle/sgn46/sign?term=${inputAsUrlParam}&${DEFAULT_FLAGS}&match=${match}`;
  return await get(url).then((res) => res);
}

export async function getSignsByText(text: string) {
  const inputAsUrlParam = encodeURIComponent(text);
  const url = `${SIGN_PUDDLE_SERVER}/puddle/sgn46/sign?text=${inputAsUrlParam}&${DEFAULT_FLAGS}`;
  return await get(url).then((res) => res);
}

export async function getSignsBySource(source: string) {
  const inputAsUrlParam = encodeURIComponent(source);
  const url = `${SIGN_PUDDLE_SERVER}/puddle/sgn46/sign?source=${inputAsUrlParam}&${DEFAULT_FLAGS}`;
  return await get(url).then((res) => res);
}

export async function getSignsWithSymbols(symbols: string[]) {
  const symbolsAsUrlParam = encodeURIComponent(symbols.join(""));
  const inputAsUrlParam = encodeURIComponent(symbolsAsUrlParam);
  const url = `${SIGN_PUDDLE_SERVER}/puddle/sgn46/sign?query=${inputAsUrlParam}&${DEFAULT_FLAGS}`;
  return await get(url).then((res) => res);
}
