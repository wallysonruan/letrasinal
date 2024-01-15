<script setup lang="ts">
import { computed } from "vue";
import type { PageItemType } from "../../../stores/PageStore";
import pageStore from "../../../stores/PageStore";
import PageItem from "../PageItem/PageItem.vue";

type PagepageProps = {
  text: PageItemType[];
};

const props = defineProps<PagepageProps>();

const pageWidth = computed(() => {
  return pageStore().pages[0].orientation === "portrait"
    ? pageStore().getSheetSize(1).width
    : pageStore().getSheetSize(1).height;
});
const pageHeight = computed(() => {
  return pageStore().pages[0].orientation === "landscape"
    ? pageStore().getSheetSize(1).width
    : pageStore().getSheetSize(1).height;
});

function handleKeyDown(event: Event) {
  const eventAsKeyboardEvent = event as KeyboardEvent;
  if (
    (eventAsKeyboardEvent.key === "ArrowUp" ||
      eventAsKeyboardEvent.key === "ArrowDown" ||
      eventAsKeyboardEvent.key === "Space" ||
      eventAsKeyboardEvent.key === "Backspace" ||
      eventAsKeyboardEvent.key === "Tab") &&
    pageStore().pageOnFocus
  ) {
    event.preventDefault();
  }

  switch (eventAsKeyboardEvent.key) {
    case "Backspace":
      pageStore().deletePageItemBeforeCaret();
      break;
    case "Tab":
      pageStore().addLongSpace();
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

function handleInput(event: Event) {
  const eventAsInputEvent = event as InputEvent;
  const input = eventAsInputEvent.data;

  if (
    (input === " " ||
      input === "," ||
      input === "." ||
      input === ":" ||
      input === "!" ||
      input === "?" ||
      input === "(" ||
      input === ")") &&
    pageStore().pageOnFocus
  ) {
    event.preventDefault();
  }

  if (input && /[0-9]/.test(input)) {
    pageStore().addNumber(input);
  }

  switch (input) {
    case " ":
      pageStore().addSpace();
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
    default:
      return;
  }
}

function setFocusOnHiddenTextarea() {
  const pageContainer = document.querySelector(".page-container");
  const textarea = pageContainer?.querySelector("textarea");

  if (textarea) {
    textarea.focus();
  }
}
</script>
<template>
  <div
    class="page-container"
    :style="`width: ${pageWidth}px; height: ${pageHeight}px;`"
    @click="setFocusOnHiddenTextarea"
    @touchstart="setFocusOnHiddenTextarea"
    @dblclick="pageStore().placeCaretAtTheEnd"
  >
    <div class="page-content">
      <PageItem
        @click="pageStore().placeCaretBeforeItemById(word.id)"
        @touchstart="pageStore().placeCaretBeforeItemById(word.id)"
        :item="word"
        v-for="(word, index) in props.text"
        :key="index"
      />
    </div>
    <textarea
      class="hidden-textarea"
      @keydown="handleKeyDown"
      @input="handleInput"
      @focus="pageStore().setPageOnFocus(true)"
      @focusout="pageStore().setPageOnFocus(false)"
    >
      <!-- Hidden. It's here just to get focus, toggle mobile virtual keyboard, and have its Events redirected to pagePage. -->
    </textarea>
  </div>
</template>
<style scoped lang="scss">
.page-container {
  position: relative;
  background-color: white;
  border: 1px solid rgb(0, 0, 0, 0.2);
  overflow: hidden;

  textarea {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 0%;
  }

  .page-content {
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
  .page-container {
    border: none !important;
  }
}
</style>
