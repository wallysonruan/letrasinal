<script setup lang="ts">
import PageItem from "@/components/PageItem/PageItem.vue";
import { onMounted, onUnmounted, ref } from "vue";

type PageSheetProps = {
  text: string[];
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

    if (classesOfelementClickedOn.contains("sheet-content") !== true) {
      isCaretVisible.value = false;
      return;
    }
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

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("page-orientation", changePageOrientation);
  window.addEventListener("page-margin", editPageMargin);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("page-orientation", changePageOrientation);
  window.removeEventListener("page-margin", editPageMargin);
});
</script>
<template>
  <div
    class="sheet-container"
    :style="`width: ${pageWidth}px; height: ${pageHeight}px;`"
    @click="handleMouseClick"
  >
    <div class="sheet-content">
      <PageItem
        class="sheet-item"
        v-for="(text, index) in props.text"
        :key="index"
        :item="text"
      />
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
