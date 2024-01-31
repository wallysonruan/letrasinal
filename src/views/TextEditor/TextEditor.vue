<script setup lang="ts">
import PageSheet from "@/components/Sheet/Page/SheetPage.vue";
import TextEditorDrawer from ".//TextEditorDrawer/TextEditorDrawer.vue";

import pageStore from "@/stores/PageStore";
import { computed } from "vue";

const pages = computed(() => pageStore().pages);
const activePage = computed(() => pageStore().pageOnFocus.id);

function handleKeyDown(event: Event) {
  const eventAsKeyboardEvent = event as KeyboardEvent;

  const writingMode = computed(() => {
    return pageStore().getWritingConfiguration(activePage.value).writingMode;
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

function setFocusOnHiddenTextarea(pageId: number) {
  pageStore().pageOnFocus.id = pageId;

  const pageContainer = document.querySelector(".text-editor-container");
  const textarea = pageContainer?.querySelector("textarea");

  if (textarea) {
    textarea.focus({ preventScroll: true });
  }
}
</script>
<template>
  <div class="text-editor-container">
    <div class="no-printable">
      <TextEditorDrawer />
    </div>
    <div class="sheets-container">
      <PageSheet
        v-for="(page, index) in pages"
        :key="index"
        :id="page.pageId"
        :text="page.text"
        @click="setFocusOnHiddenTextarea(page.pageId)"
        @touchstart="setFocusOnHiddenTextarea(page.pageId)"
      />
      <textarea
        @keydown="handleKeyDown"
        @input="handleInput"
        @focus="pageStore().setPageOnFocus(true)"
        @focusout="pageStore().setPageOnFocus(false)"
        aria-hidden="true"
        aria-disabled="true"
      >
      <!-- Hidden. It's here just to get focus, toggle mobile virtual keyboard, and have its Events redirected to pagePage. -->
    </textarea
      >
      <div class="add-page">
        <v-btn
          density="comfortable"
          icon="fa-plus"
          @click="pageStore().createPage"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.text-editor-container {
  position: relative;
  background-color: rgb(128, 128, 128, 0.06);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .sheets-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding-top: 1rem;
  }
}

textarea {
  position: fixed;
  width: 0%;
}

@media print {
  .text-editor-container {
    padding: 0% !important;

    .sheets-container {
      margin: 0% !important;
    }
  }
}
</style>
