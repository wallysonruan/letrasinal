import { defineStore } from "pinia";
import pageStore from "./PageStore";

function isPageItemNearTopBorder(
  pageItemId: string,
  spaceNeededBetweenPageItemAndTopBorder: number = 0,
) {
  const pageItem = document.querySelector(
    `.page-item[id="${pageItemId}"]`,
  ) as HTMLElement;

  if (!pageItem) {
    console.error("PageItem not found");
    return false;
  }

  return pageItem.offsetTop <= spaceNeededBetweenPageItemAndTopBorder;
}

function isPageItemNearRightBorder(
  pageItemId: string,
  spaceNeededBetweenPageItemAndRightBorder: number = 0,
) {
  const pageItem = document.querySelector(
    `.page-item[id="${pageItemId}"]`,
  ) as HTMLElement;

  if (!pageItem) {
    console.error("PageItem not found");
    return false;
  }

  const pageItemRightBorderDistanceFromParentLeftBorder =
    pageItem.offsetLeft + pageItem.offsetWidth;

  return (
    pageStore().getSheetSize(1).width -
      pageItemRightBorderDistanceFromParentLeftBorder <=
    spaceNeededBetweenPageItemAndRightBorder
  );
}

const pageItemStore = defineStore({
  id: "pageItemStore",
  // state: () => ({}),
  actions: {
    isPageItemNearTopBorder,
    isPageItemNearRightBorder,
  },
});

export default pageItemStore;
