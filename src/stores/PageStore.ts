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

export type PageItemType = {
  id: string;
  type: "sign" | "signParagraph" | "signPunctuation" | "text" | "textParagraph";
  details:
    | SignDetails
    | SignParagraphDetails
    | TextDetails
    | TextParagraphDetails;
};

const items = ref<PageItemType[]>([]);

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

function addPageItems(itemsArray: PageItemType[]) {
  itemsArray.forEach((item) => {
    items.value.push(item);
  });
}

function deletePageItemById(id: string) {
  items.value = items.value.filter((item) => item.id !== id);
}

enum PunctuationFsw {
  Comma = "S38700", // , S38700463x496
  Period = "S38800", // . S38800464x496
  QuestionMark = "?",
  ExclamationMark = "!",
  OpenParenthesis = "(",
  CloseParenthesis = ")",
  Colon = ":",
}

function addCommaAfter(itemId: string) {
  const commaPageItem: PageItemType = {
    type: "sign",
    id: "comma",
    details: {
      fsw: PunctuationFsw.Comma,
      words: ["comma"],
    },
  };

  addPageItem(commaPageItem, itemId);
}

function addPeriodAfter(itemId: string) {
  const periodPageItem: PageItemType = {
    type: "sign",
    id: "period",
    details: {
      fsw: PunctuationFsw.Period,
      words: ["period"],
    },
  };

  addPageItem(periodPageItem, itemId);
}

function addQuestionMarkAfter(itemId: string) {
  const questionMarkPageItem: PageItemType = {
    type: "sign",
    id: "questionMark",
    details: {
      fsw: PunctuationFsw.QuestionMark,
      words: ["question mark"],
    },
  };

  addPageItem(questionMarkPageItem, itemId);
}

function addExclamationMarkAfter(itemId: string) {
  const exclamationMarkPageItem: PageItemType = {
    type: "sign",
    id: "exclamationMark",
    details: {
      fsw: PunctuationFsw.ExclamationMark,
      words: ["exclamation mark"],
    },
  };

  addPageItem(exclamationMarkPageItem, itemId);
}

function addOpenParenthesisAfter(itemId: string) {
  const openParenthesisPageItem: PageItemType = {
    id: "openParenthesis",
    type: "sign",
    details: {
      fsw: PunctuationFsw.OpenParenthesis,
      words: ["open parenthesis"],
    },
  };

  addPageItem(openParenthesisPageItem, itemId);
}

function addCloseParenthesisAfter(itemId: string) {
  const closeParenthesisPageItem: PageItemType = {
    type: "sign",
    id: "closeParenthesis",
    details: {
      fsw: PunctuationFsw.CloseParenthesis,
      words: ["close parenthesis"],
    },
  };

  addPageItem(closeParenthesisPageItem, itemId);
}

function addColonAfter(itemId: string) {
  const colonPageItem: PageItemType = {
    type: "sign",
    id: "colon",
    details: {
      fsw: PunctuationFsw.Colon,
      words: ["colon"],
    },
  };

  addPageItem(colonPageItem, itemId);
}

const pageStore = defineStore({
  id: "pageStore",
  state: () => ({
    items: items,
  }),
  actions: {
    addPageItem,
    addPageItems,
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
