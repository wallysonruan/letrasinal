<script setup lang="ts">
import { computed } from "vue";
import type { PageItemType } from "../../../stores/PageStore";
import pageStore from "../../../stores/PageStore";
import PageItem from "../PageItem/PageItem.vue";

type PagepageProps = {
  id: number;
  text: PageItemType[];
};

const props = defineProps<PagepageProps>();

const pageWidth = computed(() => {
  return pageStore().getPageOrientation(props.id) === "portrait"
    ? pageStore().getSheetSize(props.id).width
    : pageStore().getSheetSize(props.id).height;
});
const pageHeight = computed(() => {
  return pageStore().getPageOrientation(props.id) === "landscape"
    ? pageStore().getSheetSize(props.id).width
    : pageStore().getSheetSize(props.id).height;
});

function handleKeyDown(event: Event) {
  const eventAsKeyboardEvent = event as KeyboardEvent;

  const writingMode = computed(() => {
    return pageStore().getWritingConfiguration(props.id).writingMode;
  });

  const isWritingModeVertical = writingMode.value === "vertical";

  if (
    (eventAsKeyboardEvent.key === "ArrowUp" ||
      eventAsKeyboardEvent.key === "ArrowDown" ||
      eventAsKeyboardEvent.key === "ArrowLeft" ||
      eventAsKeyboardEvent.key === "ArrowRight" ||
      eventAsKeyboardEvent.key === "Space" ||
      eventAsKeyboardEvent.key === "Backspace" ||
      eventAsKeyboardEvent.key === "Enter" ||
      eventAsKeyboardEvent.key === "Tab") &&
    pageStore().pageOnFocus.focus
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
    case "Enter":
      pageStore().addBreakflow();
      break;
    case "ArrowUp":
      if (isWritingModeVertical) {
        pageStore().moveCaretUp();
      }
      break;
    case "ArrowDown":
      if (isWritingModeVertical) {
        pageStore().moveCaretDown();
      }
      break;
    case "ArrowLeft":
      if (!isWritingModeVertical) {
        pageStore().moveCaretUp();
      }
      break;
    case "ArrowRight":
      if (!isWritingModeVertical) {
        pageStore().moveCaretDown();
      }
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
    pageStore().pageOnFocus.focus
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
    textarea.focus({ preventScroll: true });
  }
}
</script>
<template>
  <div
    class="page"
    :pageId="props.id"
    @click="setFocusOnHiddenTextarea"
    @touchstart="setFocusOnHiddenTextarea"
    @dblclick="pageStore().placeCaretAtTheEnd"
  >
    <div
      class="page-container"
      :style="`width: ${pageWidth}px; height: ${pageHeight}px;`"
    >
      <div
        class="page-content"
        :writing-mode="
          pageStore().getWritingConfiguration(props.id).writingMode
        "
      >
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
        @focus="pageStore().setPageOnFocus(props.id, true)"
        @focusout="pageStore().setPageOnFocus(props.id, false)"
        aria-hidden="true"
        aria-disabled="true"
      >
      <!-- Hidden. It's here just to get focus, toggle mobile virtual keyboard, and have its Events redirected to pagePage. -->
    </textarea
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
.page {
  position: relative;
  padding: 0 1rem;
  overflow: scroll;

  textarea {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 0%;
  }

  .page-container {
    padding: 1rem 1rem;
    background-color: white;
    border: 1px solid rgb(0, 0, 0, 0.2);
  }

  .page-content {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-content: baseline;
    height: 100%;
    width: 100%;

    &:hover {
      cursor: text;
    }

    &[writing-mode="vertical"] {
      flex-direction: column;
      column-gap: 1.5rem;
    }

    &[writing-mode="horizontal"] {
      flex-direction: row;
      row-gap: 1.5rem;
    }
  }
}

@media screen and (max-width: 600px) {
  .page-container {
    .page-content {
      overflow: auto;
    }
  }
}

@media print {
  .page-container {
    border: none !important;
  }
}
</style>
