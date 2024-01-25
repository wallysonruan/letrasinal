import { get } from "./client";

const SIGN_PUDDLE_SERVER = "https://signpuddle.net";
const CASE_INSENSITIVE = 1;
const SORT_BY_DESCENDING_ORDER = "-";
const SORT_BY_CREATED_AT = "created_at";
const DEFAULT_FLAGS = `sort=${SORT_BY_DESCENDING_ORDER}${SORT_BY_CREATED_AT}&ci=${CASE_INSENSITIVE}`;

export enum SignPuddleMatch {
  Start = "start",
  End = "end",
  Exact = "exact",
  Anywhere = "any",
}

export type SignPuddlePayload<T> = {
  meta: {
    limit: number;
    offset: number;
    totalResults: number;
    location: string;
    searchTime: string;
  };
  results: T[];
};

export type SignPuddleSearchEndPointResult = {
  id: string;
  user: string;
  created_at: string;
  updated_at: string;
  sign: string;
  signtext: string;
  terms: string[];
  text: string;
  source: string;
  detail: string[];
};

export type SignPuddleSignEndPointResult = {
  id: string;
  sign: string;
};

export function getSignsByTerm(
  term: string,
  match: SignPuddleMatch = SignPuddleMatch.Start,
): SignPuddlePayload<SignPuddleSearchEndPointResult> {
  const inputAsUrlParam = encodeURIComponent(term);

  const url = `${SIGN_PUDDLE_SERVER}/puddle/sgn46/search/${inputAsUrlParam}?${DEFAULT_FLAGS}&match=${match}`;
  const response: SignPuddlePayload<SignPuddleSearchEndPointResult> | unknown =
    get(url);
  return response as SignPuddlePayload<SignPuddleSearchEndPointResult>;
}

export function getSignsByText(
  text: string,
  match: SignPuddleMatch = SignPuddleMatch.Start,
): SignPuddlePayload<SignPuddleSignEndPointResult> {
  const inputAsUrlParam = encodeURIComponent(text);

  const url = `${SIGN_PUDDLE_SERVER}/puddle/sgn46/sign?text=${inputAsUrlParam}&${DEFAULT_FLAGS}&match=${match}`;
  const response: SignPuddlePayload<SignPuddleSignEndPointResult> | unknown =
    get(url);
  return response as SignPuddlePayload<SignPuddleSignEndPointResult>;
}

export function getSignsBySource(
  source: string,
  match: SignPuddleMatch = SignPuddleMatch.Start,
): SignPuddlePayload<SignPuddleSignEndPointResult> {
  const inputAsUrlParam = encodeURIComponent(source);

  const url = `${SIGN_PUDDLE_SERVER}/puddle/sgn46/sign?source=${inputAsUrlParam}&${DEFAULT_FLAGS}&match=${match}`;
  const response: SignPuddlePayload<SignPuddleSignEndPointResult> | unknown =
    get(url);
  return response as SignPuddlePayload<SignPuddleSignEndPointResult>;
}

export function getSignsWithSymbols(
  symbols: string[],
): SignPuddlePayload<SignPuddleSignEndPointResult> {
  const symbolsAsUrlParam = encodeURIComponent(symbols.join(""));
  const inputAsUrlParam = encodeURIComponent(symbolsAsUrlParam);

  const url = `${SIGN_PUDDLE_SERVER}/puddle/sgn46/sign?query=${inputAsUrlParam}&${DEFAULT_FLAGS}`;
  const response: SignPuddlePayload<SignPuddleSignEndPointResult> | unknown =
    get(url);
  return response as SignPuddlePayload<SignPuddleSignEndPointResult>;
}

export function getSignsById(
  ids: string[],
): SignPuddlePayload<SignPuddleSearchEndPointResult> {
  const symbolsAsUrlParam = encodeURIComponent(ids.join(","));
  const inputAsUrlParam = encodeURIComponent(symbolsAsUrlParam);

  const url = `${SIGN_PUDDLE_SERVER}/puddle/sgn46/entry/${inputAsUrlParam}&${DEFAULT_FLAGS}`;
  const response: SignPuddlePayload<SignPuddleSearchEndPointResult> | unknown =
    get(url);
  return response as SignPuddlePayload<SignPuddleSearchEndPointResult>;
}
