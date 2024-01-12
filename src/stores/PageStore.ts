import { defineStore } from "pinia";
import { ref } from "vue";

export type SignDetails = {
  fsw: string;
  words: string[];
};

type SignParagraphDetails = {
  signs: SignDetails[];
};

type TextDetails = {
  text: string;
};

type TextParagraphDetails = {
  text: string;
};

type PageItemTypes =
  | "sign"
  | "signParagraph"
  | "signPunctuation"
  | "text"
  | "textParagraph";

export type PageItemType = {
  id: string;
  type: PageItemTypes;
  details:
    | SignDetails
    | SignParagraphDetails
    | TextDetails
    | TextParagraphDetails;
};

const items = ref<PageItemType[]>([]);

function generateRandomId(): string {
  return crypto.randomUUID().slice(0, 5);
}

function createPageItem(
  type: PageItemTypes,
  fsw: string,
  words: string[],
): PageItemType {
  return {
    id: generateRandomId(),
    type: type,
    details: {
      fsw: fsw,
      words: words,
    },
  };
}

function addPageItem(newItem: PageItemType, id: string = "end") {
  if (id === "end") {
    items.value.push(newItem); // Insert item at the end of the array
    return;
  }

  if (id === "start") {
    items.value.unshift(newItem); // Insert item at the beginning of the array
    return;
  }

  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.value.splice(index + 1, 0, newItem); // Insert item after the item with the given id
  }
}

function deletePageItemById(id: string) {
  items.value = items.value.filter((item) => item.id !== id);
}

enum PunctuationFsw {
  Comma = "S38700", // , S38700463x496 Source: Escrita de Sinais Sem Mistério, page 185.
  Period = "S38800", // . S38800464x496  Source: Escrita de Sinais Sem Mistério, page 158.
  QuestionMark = "S38900", // ? S38900464x493  Source: Escrita de Sinais Sem Mistério, page 245.
  ExclamationMark = "S38814", // !  S38814463x495 Source: SignPuddle https://www.signbank.org/signpuddle2.0/canvas.php?ui=1&sgn=46&sid=19060
  OpenParenthesis = "S38b00", // ( S38b00470x493 Source: Escrita de Sinais Sem Mistério, page 284.
  CloseParenthesis = "S38b04", // ) S38b04470x493 Source: Escrita de Sinais Sem Mistério, page 284.
  Colon = "S38a00", // : S38a00464x490  Source: Escrita de Sinais Sem Mistério, page 185.
}

function addCommaAfter(itemId: string = "start") {
  const commaPageItem = createPageItem(
    "signPunctuation",
    PunctuationFsw.Comma,
    ["comma"],
  );
  addPageItem(commaPageItem, itemId);
}

function addPeriodAfter(itemId: string = "start") {
  const periodPageItem = createPageItem(
    "signPunctuation",
    PunctuationFsw.Period,
    ["period"],
  );
  addPageItem(periodPageItem, itemId);
}

function addQuestionMarkAfter(itemId: string = "start") {
  const questionMarkPageItem = createPageItem(
    "signPunctuation",
    PunctuationFsw.QuestionMark,
    ["question mark"],
  );
  addPageItem(questionMarkPageItem, itemId);
}

function addExclamationMarkAfter(itemId: string = "start") {
  const exclamationMarkPageItem = createPageItem(
    "signPunctuation",
    PunctuationFsw.ExclamationMark,
    ["exclamation mark"],
  );
  addPageItem(exclamationMarkPageItem, itemId);
}

function addOpenParenthesisAfter(itemId: string = "start") {
  const openParenthesisPageItem = createPageItem(
    "signPunctuation",
    PunctuationFsw.OpenParenthesis,
    ["open parenthesis"],
  );
  addPageItem(openParenthesisPageItem, itemId);
}

function addCloseParenthesisAfter(itemId: string = "start") {
  const closeParenthesisPageItem = createPageItem(
    "signPunctuation",
    PunctuationFsw.CloseParenthesis,
    ["close parenthesis"],
  );
  addPageItem(closeParenthesisPageItem, itemId);
}

function addColonAfter(itemId: string = "start") {
  const colonPageItem = createPageItem(
    "signPunctuation",
    PunctuationFsw.Colon,
    ["colon"],
  );
  addPageItem(colonPageItem, itemId);
}

const pageStore = defineStore({
  id: "pageStore",
  state: () => ({
    items: items,
  }),
  actions: {
    createPageItem,
    addPageItem,
    deletePageItemById,
    addCommaAfter,
    addPeriodAfter,
    addQuestionMarkAfter,
    addExclamationMarkAfter,
    addOpenParenthesisAfter,
    addCloseParenthesisAfter,
    addColonAfter,
  },
});

export default pageStore;
