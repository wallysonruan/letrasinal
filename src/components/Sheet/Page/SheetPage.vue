<script setup lang="ts">
import type { PageItemType } from "../../../stores/PageStore";
import pageStore from "../../../stores/PageStore";
import PageItem from "../PageItem/PageItem.vue";
import { onMounted, onUnmounted, ref } from "vue";

type PageSheetProps = {
  text: PageItemType[];
};

const props = defineProps<PageSheetProps>();

const sheetSizes = {
  a4: {
    width: 790, // original size: 794px
    height: 1100, // original size: 1123px
  },
};

const pageWidth = ref(sheetSizes.a4.width);
const pageHeight = ref(sheetSizes.a4.height);

function changePageOrientation() {
  if (pageWidth.value === sheetSizes.a4.width) {
    pageWidth.value = sheetSizes.a4.height;
    pageHeight.value = sheetSizes.a4.width;
  } else {
    pageWidth.value = sheetSizes.a4.width;
    pageHeight.value = sheetSizes.a4.height;
  }
}

function editPageMargin() {
  pageMargin.value = !pageMargin.value;
}

const pageMargin = ref(false);

function handleClick(event: MouseEvent | TouchEvent) {
  const elementClickedOn = event.target as HTMLElement;
  const classesOfElementClickedOn = elementClickedOn.classList;

  if (classesOfElementClickedOn.contains("sheet-content")) {
    pageStore().setPageOnFocus(true);
    return;
  }

  if (
    !classesOfElementClickedOn.contains("sheet-content") &&
    !classesOfElementClickedOn.contains("sp-btn")
  ) {
    pageStore().setPageOnFocus(false);
    return;
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (
    (event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.code === "Space" ||
      event.code === "Backspace" ||
      event.code === "Tab" ||
      event.key === "," ||
      event.key === "." ||
      event.key === ":" ||
      event.key === "!" ||
      event.key === "?" ||
      event.key === "(" ||
      event.key === ")") &&
    pageStore().pageOnFocus
  ) {
    event.preventDefault();
  }

  switch (event.key) {
    case " ":
      pageStore().addSpace();
      break;
    case "Backspace":
      pageStore().deletePageItemBeforeCaret();
      break;
    case "Tab":
      pageStore().addLongSpace();
      break;
    case ",":
      pageStore().addComma();
      break;
    case ".":
      pageStore().addPeriod();
      break;
    case ":":
      pageStore().addColon();
      break;
    case "!":
      pageStore().addExclamationMark();
      break;
    case "?":
      pageStore().addQuestionMark();
      break;
    case "(":
      pageStore().addOpenParenthesis();
      break;
    case ")":
      pageStore().addCloseParenthesis();
      break;
    case "ArrowUp":
      pageStore().moveCaretUp();
      break;
    case "ArrowDown":
      pageStore().moveCaretDown();
      break;
    default:
      return;
  }
}

function addSignsBeforeCaret(signs: PageItemType[]) {
  signs.forEach((sign) => {
    pageStore().addPageItem(sign);
  });
}

function handleSignPuddleSelectionFinished(event: Event) {
  const customEvent = event as CustomEvent;
  addSignsBeforeCaret(customEvent.detail);
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("click", handleClick);
  window.addEventListener("touchstart", handleClick);
  window.addEventListener("page-orientation", changePageOrientation);
  window.addEventListener("page-margin", editPageMargin);
  window.addEventListener(
    "sign-puddle-search-finished",
    handleSignPuddleSelectionFinished,
  );
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("click", handleClick);
  window.removeEventListener("touchstart", handleClick);
  window.removeEventListener("page-orientation", changePageOrientation);
  window.removeEventListener("page-margin", editPageMargin);
  window.removeEventListener(
    "sign-puddle-search-finished",
    handleSignPuddleSelectionFinished,
  );
});
</script>
<template>
  <div
    class="sheet-container"
    :style="`width: ${pageWidth}px; height: ${pageHeight}px;`"
  >
    <div class="sheet-content">
      <PageItem
        class="sheet-item"
        :item="word"
        v-for="(word, index) in props.text"
        :key="index"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.sheet-container {
  position: relative;
  background-color: white;
  border: 1px solid rgb(0, 0, 0, 0.2);
  overflow: hidden;

  .sheet-content {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    column-gap: 1.5rem;
    align-content: baseline;
    height: inherit;

    &:hover {
      cursor: text;
    }
  }
}

@media screen and (max-width: 600px) {
  //
}

@media print {
  .sheet-container {
    border: none !important;
  }
}
</style>
