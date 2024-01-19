import { defineStore } from "pinia";
import { computed, ref } from "vue";

type PageConfigurations = {
  pageId: number;
  size: string;
  orientation: "portrait" | "landscape";
  writing: {
    writingMode: "vertical" | "horizontal";
    direction: "ltr" | "rtl";
  };
  text: PageItemType[];
};

const defaultPageOrientation: PageConfigurations["orientation"] = "portrait";
const defaultWritingMode: PageConfigurations["writing"]["writingMode"] =
  "vertical";
const defaultWritingDirection: PageConfigurations["writing"]["direction"] =
  "ltr";
const defaultWritingConfiguration: PageConfigurations["writing"] = {
  writingMode: defaultWritingMode,
  direction: defaultWritingDirection,
};

const pages = ref<PageConfigurations[]>([
  {
    pageId: 1,
    size: "a4",
    orientation: defaultPageOrientation,
    writing: {
      writingMode: defaultWritingMode,
      direction: defaultWritingDirection,
    },
    text: [],
  },
]);

pages.value[0].text.push({
  id: "caret",
  type: "caret",
});

function changePageOrientation(
  pageId: number,
  orientation: PageConfigurations["orientation"],
) {
  const index = pages.value.findIndex((page) => page.pageId === pageId);
  if (index !== -1) {
    pages.value[index].orientation = orientation;
  }
}

function getPageOrientation(pageId: number): PageConfigurations["orientation"] {
  const index = pages.value.findIndex((page) => page.pageId === pageId);
  if (index !== -1) {
    return pages.value[index].orientation;
  }

  return defaultPageOrientation;
}

function getWritingConfiguration(
  pageId: number,
): PageConfigurations["writing"] {
  const index = pages.value.findIndex((page) => page.pageId === pageId);
  if (index !== -1) {
    return pages.value[index].writing;
  }

  return defaultWritingConfiguration;
}

function setWritingMode(
  pageId: number,
  writingMode: PageConfigurations["writing"]["writingMode"],
) {
  const index = pages.value.findIndex((page) => page.pageId === pageId);
  if (index !== -1) {
    pages.value[index].writing.writingMode = writingMode;
  }
}

function setWritingDirection(
  pageId: number,
  direction: PageConfigurations["writing"]["direction"],
) {
  const index = pages.value.findIndex((page) => page.pageId === pageId);
  if (index !== -1) {
    pages.value[index].writing.direction = direction;
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

function getPageSize(pageId: number) {
  const index = pages.value.findIndex((item) => item.pageId === pageId);
  if (index !== -1) {
    return pages.value[index].size;
  }
}

function getSheetSize(pageId: number) {
  const pageSize = getPageSize(pageId);
  return sheetSizes.get(pageSize);
}

export type ColumnTypes = "left" | "middle" | "right";

export type SignPunctuationDetails = {
  fsw: {
    vertical: string;
    horizontal: string;
  };
  words: string[];
  column: ColumnTypes;
};

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
    | NumberDetails
    | SignPunctuationDetails;
};

function getPageText(pageId: number) {
  const index = pages.value.findIndex((page) => page.pageId === pageId);
  if (index !== -1) {
    return pages.value[index].text;
  }
}

function setPageText(pageId: number, newText: PageItemType[]) {
  const index = pages.value.findIndex((page) => page.pageId === pageId);
  if (index !== -1) {
    return (pages.value[index].text = newText);
  }
}

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

function createSignPunctuationPageItem(
  type: PageItemTypes,
  fswVertical: string,
  fswHorizontal: string,
  words: string[],
): PageItemType {
  return {
    id: generateRandomId(),
    type: type,
    details: {
      fsw: {
        vertical: fswVertical,
        horizontal: fswHorizontal,
      },
      words: words,
      column: "middle",
    },
  };
}

function addPageItem(newItem: PageItemType, id: string = "caret") {
  if (id === "end") {
    pages.value[0].text.push(newItem); // Insert item at the end of the array
    return;
  }

  if (id === "start") {
    pages.value[0].text.unshift(newItem); // Insert item at the beginning of the array
    return;
  }

  const index = pages.value[0].text.findIndex((item) => item.id === id);
  if (index !== -1) {
    pages.value[0].text.splice(index, 0, newItem); // Insert item before the item with the given id
  }
}

function deletePageItemById(id: string) {
  pages.value[0].text = pages.value[0].text.filter((item) => item.id !== id);
}

function movePageItemUp(id: string) {
  const index = pages.value[0].text.findIndex((item) => item.id === id);
  if (index !== -1 && index !== 0) {
    const item = pages.value[0].text[index];
    pages.value[0].text.splice(index, 1);
    pages.value[0].text.splice(index - 1, 0, item);
  }
}

function movePageItemDown(id: string) {
  const index = pages.value[0].text.findIndex((item) => item.id === id);

  if (index !== -1 && index !== pages.value[0].text.length - 1) {
    const item = pages.value[0].text[index];
    pages.value[0].text.splice(index, 1);
    pages.value[0].text.splice(index + 1, 0, item);
  }
}

function moveCaretUp() {
  movePageItemUp("caret");
}

function moveCaretDown() {
  movePageItemDown("caret");
}

function deletePageItemBeforeCaret() {
  const index = pages.value[0].text.findIndex((item) => item.id === "caret");
  if (index !== -1 && index !== 0) {
    pages.value[0].text.splice(index - 1, 1);
  }
}

function placeCaretBeforeItemById(id: string) {
  const caretIndex = pages.value[0].text.findIndex(
    (item) => item.id === "caret",
  );
  let targetIndex = pages.value[0].text.findIndex((item) => item.id === id);

  if (caretIndex !== -1 && targetIndex !== -1) {
    const caretItem = pages.value[0].text[caretIndex];
    // Remove the caret item from its current position
    pages.value[0].text.splice(caretIndex, 1);
    // If the caret item was before the target item, decrement the target index
    if (caretIndex < targetIndex) {
      targetIndex--;
    }
    // Insert the caret item before the target item
    pages.value[0].text.splice(targetIndex, 0, caretItem);
  }
}

function placeCaretAtTheEnd() {
  const caretIndex = pages.value[0].text.findIndex(
    (item) => item.id === "caret",
  );
  if (caretIndex !== -1) {
    const caretItem = pages.value[0].text[caretIndex];
    // Remove the caret item from its current position
    pages.value[0].text.splice(caretIndex, 1);
    // Insert the caret item at the end
    pages.value[0].text.push(caretItem);
  }
}

function changePageItemColumn(id: string, column: ColumnTypes) {
  const index = pages.value[0].text.findIndex((item) => item.id === id);
  if (index !== -1) {
    (pages.value[0].text[index].details as SignDetails).column = column;
  }

  replacePageItemById(id, pages.value[0].text[index]);
}

function replacePageItemById(id: string, newItem: PageItemType) {
  const index = pages.value[0].text.findIndex((item) => item.id === id);
  if (index !== -1) {
    pages.value[0].text.splice(index, 1, newItem);
  }
}

const punctuationFsw = {
  comma: {
    vertical: "S38700", // , S38700463x496 Source: Escrita de Sinais Sem Mistério, page 185.
    horizontal: "S38702", // ,
  },
  period: {
    vertical: "S38800", // . S38800464x496  Source: Escrita de Sinais Sem Mistério, page 158.
    horizontal: "S38802", // .
  },
  questionMark: {
    vertical: "S38900", // ? S38900464x493  Source: Escrita de Sinais Sem Mistério, page 245.
    horizontal: "S38902", // ?
  },
  exclamationMark: {
    vertical: "S38814", // !  S38814463x495 Source: SignPuddle https://www.signbank.org/signpuddle2.0/canvas.php?ui=1&sgn=46&sid=19060
    horizontal: "S38816", // !
  },
  openParenthesis: {
    vertical: "S38b00", // ( S38b00470x493 Source: Escrita de Sinais Sem Mistério, page 284.
    horizontal: "S38b02", // (
  },
  closeParenthesis: {
    vertical: "S38b04", // ) S38b04470x493 Source: Escrita de Sinais Sem Mistério, page 284.
    horizontal: "S38b06", // )
  },
  colon: {
    vertical: "S38a00", // : S38a00464x490  Source: Escrita de Sinais Sem Mistério, page 185.
    horizontal: "S38a02", // :
  },
};

function addComma(itemId: string = "caret") {
  const commaPageItem = createSignPunctuationPageItem(
    "signPunctuation",
    punctuationFsw.comma.vertical,
    punctuationFsw.comma.horizontal,
    ["comma"],
  );
  addPageItem(commaPageItem, itemId);
}

function addPeriod(itemId: string = "caret") {
  const periodPageItem = createSignPunctuationPageItem(
    "signPunctuation",
    punctuationFsw.period.vertical,
    punctuationFsw.period.horizontal,
    ["period"],
  );
  addPageItem(periodPageItem, itemId);
}

function addQuestionMark(itemId: string = "caret") {
  const questionMarkPageItem = createSignPunctuationPageItem(
    "signPunctuation",
    punctuationFsw.questionMark.vertical,
    punctuationFsw.questionMark.horizontal,
    ["question mark"],
  );
  addPageItem(questionMarkPageItem, itemId);
}

function addExclamationMark(itemId: string = "caret") {
  const exclamationMarkPageItem = createSignPunctuationPageItem(
    "signPunctuation",
    punctuationFsw.exclamationMark.vertical,
    punctuationFsw.exclamationMark.horizontal,
    ["exclamation mark"],
  );
  addPageItem(exclamationMarkPageItem, itemId);
}

function addOpenParenthesis(itemId: string = "caret") {
  const openParenthesisPageItem = createSignPunctuationPageItem(
    "signPunctuation",
    punctuationFsw.openParenthesis.vertical,
    punctuationFsw.openParenthesis.horizontal,
    ["open parenthesis"],
  );
  addPageItem(openParenthesisPageItem, itemId);
}

function addCloseParenthesis(itemId: string = "caret") {
  const closeParenthesisPageItem = createSignPunctuationPageItem(
    "signPunctuation",
    punctuationFsw.closeParenthesis.vertical,
    punctuationFsw.closeParenthesis.horizontal,
    ["close parenthesis"],
  );
  addPageItem(closeParenthesisPageItem, itemId);
}

function addColon(itemId: string = "caret") {
  const colonPageItem = createSignPunctuationPageItem(
    "signPunctuation",
    punctuationFsw.colon.vertical,
    punctuationFsw.colon.horizontal,
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
    pages: pages,
    pageOnFocus: pageOnFocus,
  }),
  actions: {
    // Page actions
    changePageOrientation,
    getPageOrientation,
    getPageSize,
    setPageOnFocus,
    setPageText,
    getPageText,
    // Writing actions
    getWritingConfiguration,
    setWritingMode,
    setWritingDirection,
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
