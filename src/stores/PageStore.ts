import { defineStore } from "pinia";
import { computed, ref } from "vue";

const sheetConfigurations = ref({
  columns: {
    activate: false,
    show: {
      left: false,
      middle: false,
      right: false,
    },
  },
  showBreakflow: false,
  showSpaces: false,
  pageOnFocus: {
    id: 0,
    focus: false,
  },
  totalPages: 1,
});

function shouldActivateColumns() {
  return sheetConfigurations.value.columns.activate;
}

function toggleColumns(activate: boolean) {
  sheetConfigurations.value.columns.activate = activate;
}

function shouldShowColumns() {
  return sheetConfigurations.value.columns.show;
}

function toggleColumnsVisibility(
  column: "left" | "middle" | "right",
  show: boolean,
) {
  sheetConfigurations.value.columns.show[column] = show;
}

function toggleAllColumnsVisibility(show: boolean) {
  sheetConfigurations.value.columns.show.left = show;
  sheetConfigurations.value.columns.show.middle = show;
  sheetConfigurations.value.columns.show.right = show;
}

function getColumnsVisibility(column: "left" | "middle" | "right" | "all") {
  if (column === "all") {
    return (
      sheetConfigurations.value.columns.show.left &&
      sheetConfigurations.value.columns.show.middle &&
      sheetConfigurations.value.columns.show.right
    );
  }

  return sheetConfigurations.value.columns.show[column];
}

function shouldShowBreakflow() {
  return sheetConfigurations.value.showBreakflow;
}

function toggleBreakflow(show: boolean) {
  sheetConfigurations.value.showBreakflow = show;
}

function shouldShowSpaces() {
  return sheetConfigurations.value.showSpaces;
}

function toggleSpaces(show: boolean) {
  sheetConfigurations.value.showSpaces = show;
}

function getTotalPages() {
  return sheetConfigurations.value.totalPages;
}

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
    pageId: 0,
    size: "a4",
    orientation: defaultPageOrientation,
    writing: {
      writingMode: defaultWritingMode,
      direction: defaultWritingDirection,
    },
    text: [],
  },
]);

addCaret();

const activePage = computed(() => sheetConfigurations.value.pageOnFocus.id);

function createPage() {
  const pageId = pages.value.length;
  pages.value.push({
    pageId: pageId,
    size: "a4",
    orientation: defaultPageOrientation,
    writing: {
      writingMode: defaultWritingMode,
      direction: defaultWritingDirection,
    },
    text: [],
  });

  sheetConfigurations.value.totalPages =
    sheetConfigurations.value.totalPages + 1;
  addCaret();
}

function changePageOrientation(orientation: PageConfigurations["orientation"]) {
  const index = pages.value.findIndex(
    (page) => page.pageId === activePage.value,
  );
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
  writingMode: PageConfigurations["writing"]["writingMode"],
) {
  const index = pages.value.findIndex(
    (page) => page.pageId === activePage.value,
  );
  if (index !== -1) {
    pages.value[index].writing.writingMode = writingMode;
  }
}

function setWritingDirection(
  direction: PageConfigurations["writing"]["direction"],
) {
  const index = pages.value.findIndex(
    (page) => page.pageId === activePage.value,
  );
  if (index !== -1) {
    pages.value[index].writing.direction = direction;
  }
}

function setPageOnFocus(value: boolean) {
  sheetConfigurations.value.pageOnFocus.focus = value;
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

function getSheetSize(pageId: number): { width: number; height: number } {
  const pageSize = getPageSize(pageId);
  return sheetSizes.get(pageSize);
}

export type SignPunctuationDetails = {
  fsw: {
    vertical: string;
    horizontal: string;
  };
  words: string[];
  style?: {
    fontSize?: number;
  };
};

export type SignDetails = {
  fsw: string;
  words: string[];
  style?: {
    fontSize?: number;
  };
};

type SignParagraphDetails = {
  signs: SignDetails[];
};

export type TextDetails = {
  text: string;
};

export type NumberDetails = {
  number: string;
  style?: {
    fontSize?: number;
  };
};

type ParagraphDetails = {
  text: string;
};

type PunctuationTypes = "space" | "long-space";

export type PunctuationDetails = {
  type: PunctuationTypes;
};

export type SimplePageItemDetails = {};

export type PageItemTypes =
  | "sign"
  | "signParagraph"
  | "signPunctuation"
  | "text"
  | "paragraph"
  | "punctuation"
  | "breakflow"
  | "caret"
  | "number";

export type PageItemType = {
  id: string;
  type: PageItemTypes;
  details?:
    | SimplePageItemDetails
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
      style: {
        fontSize: 0.7,
      },
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
      style: {
        fontSize: 0.7,
      },
    },
  };
}

function addPageItem(
  newItem: PageItemType,
  id: string = "caret",
  pageId: number = sheetConfigurations.value.pageOnFocus.id,
) {
  if (id === "end") {
    getPageText(pageId)?.push(newItem); // Insert item at the end of the array
    return;
  }

  if (id === "start") {
    getPageText(pageId)?.unshift(newItem); // Insert item at the beginning of the array
    return;
  }

  const index = getPageText(pageId)?.findIndex((item) => item.id === id);
  if (index !== -1) {
    getPageText(pageId)?.splice(index as number, 0, newItem); // Insert item before the item with the given id
  }
}

function deletePageItemById(itemId: string, pageId = activePage.value) {
  const page = getPageText(pageId)!;
  const itemIndex = page.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    page.splice(itemIndex, 1);
  }
}

/**
 * @description Places the item with the given referenceItem id before the item with the given itemToBePlacedBefore id.
 *
 */
function placePageItemBeforeItemById(
  referenceItem: string,
  itemToBePlacedBefore: string,
) {
  const page = getPageText(activePage.value)!;
  const referenceItemIndex = page.findIndex(
    (item) => item.id === referenceItem,
  );
  const itemToBeMovedIndex = page.findIndex(
    (item) => item.id === itemToBePlacedBefore,
  );

  if (referenceItemIndex !== -1 && itemToBeMovedIndex !== -1) {
    const item = page[itemToBeMovedIndex];
    page.splice(itemToBeMovedIndex, 1);
    if (itemToBeMovedIndex < referenceItemIndex) {
      page.splice(referenceItemIndex - 1, 0, item);
    } else {
      page.splice(referenceItemIndex, 0, item);
    }
  }
}

function movePageItemUp(id: string) {
  const index = getPageText(activePage.value)!.findIndex(
    (item) => item.id === id,
  );
  if (index !== -1 && index !== 0) {
    const item = getPageText(activePage.value)![index];
    getPageText(activePage.value)!.splice(index, 1);
    getPageText(activePage.value)!.splice(index - 1, 0, item);
  }
}

function movePageItemDown(id: string) {
  const index = getPageText(activePage.value)!.findIndex(
    (item) => item.id === id,
  );

  if (index !== -1 && index !== getPageText(activePage.value)!.length - 1) {
    const item = getPageText(activePage.value)![index];
    getPageText(activePage.value)!.splice(index, 1);
    getPageText(activePage.value)!.splice(index + 1, 0, item);
  }
}

function getPageItemFontSize(textId: string): number | undefined {
  const textItem = getPageText(activePage.value)?.find((t) => t.id === textId);
  const style = (textItem?.details as SignDetails | SignPunctuationDetails)
    .style;

  return style?.fontSize;
}

function increaseFontSize(textId: string): void {
  const fontSize = getPageItemFontSize(textId);
  if (fontSize !== undefined && fontSize >= 1) {
    changeFontSize(textId, fontSize + 1);
  }

  if (fontSize !== undefined && fontSize === 0.7) {
    changeFontSize(textId, 1);
  }
}

function decreaseFontSize(textId: string): void {
  const fontSize = getPageItemFontSize(textId);
  if (fontSize !== undefined && fontSize > 1) {
    changeFontSize(textId, fontSize - 1);
  }

  if (fontSize && fontSize === 1) {
    changeFontSize(textId, 0.7);
  }
}

function changeFontSize(textId: string, newFontSize: number): void {
  const textItem = getPageText(activePage.value)?.find((t) => t.id === textId);
  const style = (textItem?.details as SignDetails | SignPunctuationDetails)
    .style;

  if (textItem && style) {
    style.fontSize = newFontSize;
  }
}

function getPageItemIndex(textId: string): number | undefined {
  return getPageText(activePage.value)?.findIndex((item) => item.id === textId);
}

function getPageItemPreviousSibling(textId: string): PageItemType | undefined {
  const index = getPageItemIndex(textId);
  if (index !== undefined && index > 0) {
    return getPageText(activePage.value)?.[index - 1];
  }
}

function addCaret() {
  const caretPageItem: PageItemType = {
    id: "caret",
    type: "caret",
    details: {
      column: "middle",
    },
  };

  // Caret should be added to all pages, but only displayed when page gets focus.
  pages.value.forEach((page) => {
    const hasCaret = page.text.find((item) => item.id === "caret");
    if (hasCaret) {
      return;
    }
    addPageItem(caretPageItem, "end", page.pageId);
  });
}

function moveCaretUp() {
  movePageItemUp("caret");
}

function moveCaretDown() {
  movePageItemDown("caret");
}

function deletePageItemBeforeCaret() {
  const index = getPageText(activePage.value)!.findIndex(
    (item) => item.id === "caret",
  );
  if (index !== -1 && index !== 0) {
    getPageText(activePage.value)!.splice(index - 1, 1);
  }
}

function placeCaretBeforeItemById(id: string) {
  const caretIndex = getPageText(activePage.value)!.findIndex(
    (item) => item.id === "caret",
  );
  let targetIndex = getPageText(activePage.value)!.findIndex(
    (item) => item.id === id,
  );

  if (caretIndex !== -1 && targetIndex !== -1) {
    const caretItem = getPageText(activePage.value)![caretIndex];
    // Remove the caret item from its current position
    getPageText(activePage.value)!.splice(caretIndex, 1);
    // If the caret item was before the target item, decrement the target index
    if (caretIndex < targetIndex) {
      targetIndex--;
    }
    // Insert the caret item before the target item
    getPageText(activePage.value)!.splice(targetIndex, 0, caretItem);
  }
}

function placeCaretAtTheEnd() {
  const caretIndex = getPageText(activePage.value)!.findIndex(
    (item) => item.id === "caret",
  );
  if (caretIndex !== -1) {
    const caretItem = getPageText(activePage.value)![caretIndex];
    // Remove the caret item from its current position
    getPageText(activePage.value)!.splice(caretIndex, 1);
    // Insert the caret item at the end
    getPageText(activePage.value)!.push(caretItem);
  }
}

function changePageItemColumn(id: string, column: "L" | "M" | "R") {
  const index = getPageText(activePage.value)!.findIndex(
    (item) => item.id === id,
  );
  if (index !== -1) {
    const pageText = getPageText(activePage.value)!;
    const fsw = (pageText[index].details as SignDetails).fsw;
    const newFsw = column + fsw.substring(1);
    (pageText[index].details as SignDetails).fsw = newFsw;
  }
}

function replacePageItemById(id: string, newItem: PageItemType) {
  const index = getPageText(activePage.value)!.findIndex(
    (item) => item.id === id,
  );
  if (index !== -1) {
    getPageText(activePage.value)!.splice(index, 1, newItem);
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

function addBreakflow(itemId: string = "caret") {
  const brakPageItem: PageItemType = {
    id: generateRandomId(),
    type: "breakflow",
    details: {
      column: "middle",
    },
  };
  addPageItem(brakPageItem, itemId);
}

function addNumber(number: string, itemId: string = "caret") {
  const numberPageItem: PageItemType = {
    id: generateRandomId(),
    type: "number",
    details: {
      number: number,
      column: "middle",
      style: {
        fontSize: 0.7,
      },
    },
  };
  addPageItem(numberPageItem, itemId);
}

const pageStore = defineStore({
  id: "pageStore",
  state: () => ({
    pages: pages,
    pageOnFocus: sheetConfigurations.value.pageOnFocus,
  }),
  actions: {
    // Page actions
    createPage,
    changePageOrientation,
    getPageOrientation,
    getPageSize,
    setPageOnFocus,
    setPageText,
    getPageText,
    shouldActivateColumns,
    shouldShowColumns,
    toggleColumnsVisibility,
    toggleAllColumnsVisibility,
    toggleColumns,
    getColumnsVisibility,
    shouldShowBreakflow,
    toggleBreakflow,
    shouldShowSpaces,
    toggleSpaces,
    getTotalPages,
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
    placePageItemBeforeItemById,
    movePageItemUp,
    movePageItemDown,
    getPageItemFontSize,
    increaseFontSize,
    decreaseFontSize,
    getPageItemIndex,
    getPageItemPreviousSibling,
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
    addBreakflow,
    addNumber,
  },
});

export default pageStore;
