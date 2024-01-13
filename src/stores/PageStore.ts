import { defineStore } from "pinia";
import { ref } from "vue";

export type SignDetails = {
  fsw: string;
  words: string[];
};

type SignParagraphDetails = {
  signs: SignDetails[];
};

export type TextDetails = {
  text: string;
};

type ParagraphDetails = {
  text: string;
};

type PunctuationTypes = "space" | "long-space";

export type PunctuationDetails = {
  type: PunctuationTypes;
};

type PageItemTypes =
  | "sign"
  | "signParagraph"
  | "signPunctuation"
  | "text"
  | "paragraph"
  | "punctuation"
  | "caret";

export type PageItemType = {
  id: string;
  type: PageItemTypes;
  details?:
    | SignDetails
    | SignParagraphDetails
    | TextDetails
    | ParagraphDetails
    | PunctuationDetails;
};

const items = ref<PageItemType[]>([]);
items.value.push({
  id: "caret",
  type: "caret",
});

function generateRandomId(): string {
  return crypto.randomUUID().slice(0, 5);
}

function createSignPageItem(
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

function addPageItem(newItem: PageItemType, id: string = "caret") {
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
    items.value.splice(index, 0, newItem); // Insert item before the item with the given id
  }
}

function deletePageItemById(id: string) {
  items.value = items.value.filter((item) => item.id !== id);
}

function deletePageItemBeforeCaret() {
  const index = items.value.findIndex((item) => item.id === "caret");
  if (index !== -1 && index !== 0) {
    items.value.splice(index - 1, 1);
  }
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

function addComma(itemId: string = "caret") {
  const commaPageItem = createSignPageItem(
    "signPunctuation",
    PunctuationFsw.Comma,
    ["comma"],
  );
  addPageItem(commaPageItem, itemId);
}

function addPeriod(itemId: string = "caret") {
  const periodPageItem = createSignPageItem(
    "signPunctuation",
    PunctuationFsw.Period,
    ["period"],
  );
  addPageItem(periodPageItem, itemId);
}

function addQuestionMark(itemId: string = "caret") {
  const questionMarkPageItem = createSignPageItem(
    "signPunctuation",
    PunctuationFsw.QuestionMark,
    ["question mark"],
  );
  addPageItem(questionMarkPageItem, itemId);
}

function addExclamationMark(itemId: string = "caret") {
  const exclamationMarkPageItem = createSignPageItem(
    "signPunctuation",
    PunctuationFsw.ExclamationMark,
    ["exclamation mark"],
  );
  addPageItem(exclamationMarkPageItem, itemId);
}

function addOpenParenthesis(itemId: string = "caret") {
  const openParenthesisPageItem = createSignPageItem(
    "signPunctuation",
    PunctuationFsw.OpenParenthesis,
    ["open parenthesis"],
  );
  addPageItem(openParenthesisPageItem, itemId);
}

function addCloseParenthesis(itemId: string = "caret") {
  const closeParenthesisPageItem = createSignPageItem(
    "signPunctuation",
    PunctuationFsw.CloseParenthesis,
    ["close parenthesis"],
  );
  addPageItem(closeParenthesisPageItem, itemId);
}

function addColon(itemId: string = "caret") {
  const colonPageItem = createSignPageItem(
    "signPunctuation",
    PunctuationFsw.Colon,
    ["colon"],
  );
  addPageItem(colonPageItem, itemId);
}

function addSpace(itemId: string = "caret") {
  const spacePageItem: PageItemType = {
    id: generateRandomId(),
    type: "punctuation",
    details: {
      type: "space",
    },
  };
  addPageItem(spacePageItem, itemId);
}

function addLongSpace(itemId: string = "caret") {
  const spacePageItem: PageItemType = {
    id: generateRandomId(),
    type: "punctuation",
    details: {
      type: "long-space",
    },
  };
  addPageItem(spacePageItem, itemId);
}

function moveCaretUp() {
  const index = items.value.findIndex((item) => item.id === "caret");
  if (index !== -1 && index !== 0) {
    const item = items.value[index];
    items.value.splice(index, 1);
    items.value.splice(index - 1, 0, item);
  }
}

function moveCaretDown() {
  const index = items.value.findIndex((item) => item.id === "caret");
  if (index !== -1 && index !== items.value.length - 1) {
    const item = items.value[index];
    items.value.splice(index, 1);
    items.value.splice(index + 1, 0, item);
  }
}

const pageOnFocus = ref(false);

function setPageOnFocus(value: boolean) {
  pageOnFocus.value = value;
}

const pageStore = defineStore({
  id: "pageStore",
  state: () => ({
    items: items,
    pageOnFocus: pageOnFocus,
  }),
  actions: {
    createSignPageItem,
    addPageItem,
    deletePageItemBeforeCaret,
    deletePageItemById,
    addComma,
    addPeriod,
    addQuestionMark,
    addExclamationMark,
    addOpenParenthesis,
    addCloseParenthesis,
    addColon,
    addSpace,
    addLongSpace,
    setPageOnFocus,
    moveCaretUp,
    moveCaretDown,
  },
});

export default pageStore;
