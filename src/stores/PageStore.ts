import { defineStore } from "pinia";
import { ref } from "vue";

const pages = ref([
  {
    page: 1,
    size: "a4",
    orientation: "portrait",
  },
]);

function changePageOrientation(page: number, orientation: string) {
  const index = pages.value.findIndex((item) => item.page === page);
  if (index !== -1) {
    pages.value[index].orientation = orientation;
  }
}

function getPageOrientation(page: number) {
  const index = pages.value.findIndex((item) => item.page === page);
  if (index !== -1) {
    return pages.value[index].orientation;
  }
}

const pageOnFocus = ref(false);

function setPageOnFocus(value: boolean) {
  pageOnFocus.value = value;
}

const sheetSizes = new Map();
sheetSizes.set("a4", {
  width: 790, // original size: 794px
  height: 1100, // original size: 1123px
});

function getPageSize(page: number) {
  const index = pages.value.findIndex((item) => item.page === page);
  if (index !== -1) {
    return pages.value[index].size;
  }
}

function getSheetSize(page: number) {
  const pageSize = getPageSize(page);
  return sheetSizes.get(pageSize);
}

export type ColumnTypes = "left" | "middle" | "right";

export type SignDetails = {
  fsw: string;
  words: string[];
  column: ColumnTypes;
};

type SignParagraphDetails = {
  signs: SignDetails[];
};

export type TextDetails = {
  text: string;
};

export type NumberDetails = {
  number: string;
  column: ColumnTypes;
};

type ParagraphDetails = {
  text: string;
};

type PunctuationTypes = "space" | "long-space";

export type PunctuationDetails = {
  type: PunctuationTypes;
  column: ColumnTypes;
};

export type PageItemTypes =
  | "sign"
  | "signParagraph"
  | "signPunctuation"
  | "text"
  | "paragraph"
  | "punctuation"
  | "caret"
  | "number";

export type PageItemType = {
  id: string;
  type: PageItemTypes;
  details?:
    | SignDetails
    | SignParagraphDetails
    | TextDetails
    | ParagraphDetails
    | PunctuationDetails
    | NumberDetails;
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
      column: "middle",
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

function movePageItemUp(id: string) {
  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1 && index !== 0) {
    const item = items.value[index];
    items.value.splice(index, 1);
    items.value.splice(index - 1, 0, item);
  }
}

function movePageItemDown(id: string) {
  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1 && index !== items.value.length - 1) {
    const item = items.value[index];
    items.value.splice(index, 1);
    items.value.splice(index + 1, 0, item);
  }
}

function moveCaretUp() {
  movePageItemUp("caret");
}

function moveCaretDown() {
  movePageItemDown("caret");
}

function deletePageItemBeforeCaret() {
  const index = items.value.findIndex((item) => item.id === "caret");
  if (index !== -1 && index !== 0) {
    items.value.splice(index - 1, 1);
  }
}

function placeCaretBeforeItemById(id: string) {
  const caretIndex = items.value.findIndex((item) => item.id === "caret");
  let targetIndex = items.value.findIndex((item) => item.id === id);

  if (caretIndex !== -1 && targetIndex !== -1) {
    const caretItem = items.value[caretIndex];
    // Remove the caret item from its current position
    items.value.splice(caretIndex, 1);
    // If the caret item was before the target item, decrement the target index
    if (caretIndex < targetIndex) {
      targetIndex--;
    }
    // Insert the caret item before the target item
    items.value.splice(targetIndex, 0, caretItem);
  }
}

function placeCaretAtTheEnd() {
  const caretIndex = items.value.findIndex((item) => item.id === "caret");
  if (caretIndex !== -1) {
    const caretItem = items.value[caretIndex];
    // Remove the caret item from its current position
    items.value.splice(caretIndex, 1);
    // Insert the caret item at the end
    items.value.push(caretItem);
  }
}

function changePageItemColumn(id: string, column: ColumnTypes) {
  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    (items.value[index].details as SignDetails).column = column;
  }

  replacePageItemById(id, items.value[index]);
}

function replacePageItemById(id: string, newItem: PageItemType) {
  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.value.splice(index, 1, newItem);
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
      column: "middle",
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
      column: "middle",
    },
  };
  addPageItem(spacePageItem, itemId);
}

function addNumber(number: string, itemId: string = "caret") {
  const numberPageItem: PageItemType = {
    id: generateRandomId(),
    type: "number",
    details: {
      number: number,
      column: "middle",
    },
  };
  addPageItem(numberPageItem, itemId);
}

const pageStore = defineStore({
  id: "pageStore",
  state: () => ({
    items: items,
    pageOnFocus: pageOnFocus,
    pages: pages,
  }),
  actions: {
    // Page actions
    changePageOrientation,
    getPageOrientation,
    getPageSize,
    setPageOnFocus,
    // Shet actions
    getSheetSize,
    // Page item actions
    createSignPageItem,
    addPageItem,
    deletePageItemById,
    changePageItemColumn,
    movePageItemUp,
    movePageItemDown,
    moveCaretUp,
    moveCaretDown,
    placeCaretBeforeItemById,
    deletePageItemBeforeCaret,
    placeCaretAtTheEnd,
    addComma,
    addPeriod,
    addQuestionMark,
    addExclamationMark,
    addOpenParenthesis,
    addCloseParenthesis,
    addColon,
    addSpace,
    addLongSpace,
    addNumber,
  },
});

export default pageStore;
