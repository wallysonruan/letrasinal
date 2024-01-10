<script setup lang="ts">
import type { PageItemType } from "@/components/PageItem/PageItem.vue";
import PageItem from "@/components/PageItem/PageItem.vue";
import { onMounted, onUnmounted, ref } from "vue";
import pageStore from "@/stores/PageStore";

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

const isCaretVisible = ref(false);

function handleMouseClick(event: MouseEvent) {
  const elementClickedOn = event.target as HTMLElement;
  const classesOfelementClickedOn = elementClickedOn.classList;
  const customCaret = document.querySelector(
    ".custom-blinking-caret",
  ) as HTMLElement;

  if (customCaret) {
    if (classesOfelementClickedOn.contains("sheet-content")) {
      isCaretVisible.value = true;
      return;
    }

    if (classesOfelementClickedOn.contains("sheet-item")) {
      elementClickedOn.before(customCaret);
      return;
    }

    // if (classesOfelementClickedOn.contains("sheet-content") !== true) {
    //   isCaretVisible.value = false;
    //   return;
    // }
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (
    (event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.code === "Space" ||
      event.code === "Tab") &&
    isCaretVisible.value
  ) {
    event.preventDefault();
  }

  const customCaret = document.querySelector(
    ".custom-blinking-caret",
  ) as HTMLElement;

  if (!customCaret) return;

  const sheetItems = Array.from(document.querySelectorAll(".sheet-item"));
  const caretIndex = sheetItems.indexOf(customCaret);

  if (event.key === "ArrowUp" && caretIndex > 0) {
    // Move the caret before the previous .sheet-item
    sheetItems[caretIndex - 1].before(customCaret);
    return;
  }

  if (event.key === "ArrowDown" && caretIndex < sheetItems.length - 1) {
    // Move the caret after the next .sheet-item
    sheetItems[caretIndex + 1].after(customCaret);
    return;
  }

  if (event.code === "Space") {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("sheet-item");
    emptyDiv.classList.add("space");
    emptyDiv.style.height = "1rem";
    customCaret.before(emptyDiv);
    return;
  }

  // Delete
  if (event.code === "Backspace") {
    const previousElement = customCaret.previousElementSibling;
    if (previousElement) {
      previousElement.remove();
    }
    return;
  }

  if (event.code === "Tab") {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("sheet-item");
    emptyDiv.classList.add("tab-space");
    emptyDiv.style.height = "4rem";
    customCaret.before(emptyDiv);
    return;
  }
}

function addSignsBeforeCaret(signs: PageItemType[]) {
  const customCaret = document.querySelector(
    ".custom-blinking-caret",
  ) as HTMLElement;

  signs.forEach((sign) => {
    const caretPreviousSibling =
      customCaret.previousElementSibling as HTMLElement;
    if (caretPreviousSibling) {
      const siblingId = caretPreviousSibling.getAttribute("id") ?? "";
      pageStore().addPageItem(sign, siblingId);
      return;
    }
    pageStore().addPageItem(sign);
  });
}

function handleSignPuddleSelectionFinished(event: Event) {
  const customEvent = event as CustomEvent;
  addSignsBeforeCaret(customEvent.detail);
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("click", handleMouseClick);
  window.addEventListener("page-orientation", changePageOrientation);
  window.addEventListener("page-margin", editPageMargin);
  window.addEventListener(
    "sign-puddle-search-finished",
    handleSignPuddleSelectionFinished,
  );
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("click", handleMouseClick);
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
      <PageItem class="sheet-item" :items="props.text" />
      <div
        class="sheet-item custom-blinking-caret"
        v-show="isCaretVisible"
      ></div>
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
    height: 2rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    column-gap: 1.5rem;
    align-content: baseline;
    height: inherit;

    &:hover {
      cursor: text;
    }

    .custom-blinking-caret {
      position: relative;

      &::after {
        position: absolute;
        content: "";
        display: block;
        height: 2px;
        min-width: 2rem;
        width: 100%;
        background-color: black;
        animation: pulse 1s infinite;

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          40% {
            opacity: 0;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .sheet-container {
    width: 100% !important;
  }
}

@media print {
  .sheet-container {
    border: none !important;
  }
}
</style>
