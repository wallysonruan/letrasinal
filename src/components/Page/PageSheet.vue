<script setup lang="ts">
import PageItem from "@/components/PageItem/PageItem.vue";
import { ref, type StyleValue } from "vue";

const sheetSizes = {
  a4: {
    width: 790, // width: 794p, // original size
    height: 1100, // height: 1123, // original size
  },
};

const pageWidth = ref(sheetSizes.a4.width);
const pageHeight = ref(sheetSizes.a4.height);

const sheetContentStyles: StyleValue = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  columnGap: "1.5rem",
  alignContent: "baseline",
  height: "inherit",
};

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

window.addEventListener("page-orientation", () => {
  changePageOrientation();
});

window.addEventListener("page-margin", () => {
  editPageMargin();
});

const pageMargin = ref(false);

const isCaretVisible = ref(false);
window.addEventListener("click", (e) => {
  const customCaret = document.querySelector(
    ".custom-blinking-caret",
  ) as HTMLElement;

  if (customCaret) {
    //
    if ((e.target as HTMLElement).classList.contains("sheet-content")) {
      isCaretVisible.value = true;
      return;
    }

    //
    if ((e.target as HTMLElement).classList.contains("sheet-item")) {
      (e.target as HTMLElement).before(customCaret);
      return;
    }

    //
    if (
      (e.target as HTMLElement).classList.contains("sheet-content") !== true
    ) {
      isCaretVisible.value = false;
      return;
    }
  }
});

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    if (isCaretVisible.value) {
      event.preventDefault();
    }
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
}

// Add a global keydown event listener
window.addEventListener("keydown", (e) => {
  handleKeyDown(e);
});

const items = {
  text: [
    "M519x515S1005f498x485S26501481x486",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
  ],
};
</script>
<template>
  <div
    class="sheet-container"
    :style="`width: ${pageWidth}px; height: ${pageHeight}px;`"
  >
    <Vue3DraggableResizable
      :active="pageMargin"
      :parent="true"
      :draggable="false"
      :w="sheetSizes.a4.width"
      :h="sheetSizes.a4.height"
      :handles="['tm', 'mr', 'bm', 'ml']"
    >
      <div class="sheet-content" :style="sheetContentStyles">
        <PageItem
          class="sheet-item"
          v-for="item in items.text"
          :key="item"
          :item="item"
        />
        <div
          class="sheet-item custom-blinking-caret"
          v-show="isCaretVisible"
        ></div>
      </div>
    </Vue3DraggableResizable>
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
