<script setup lang="ts">
import PageItem from "@/components/PageItem/PageItem.vue";
import type { StyleValue } from "vue";
import { onMounted, ref } from "vue";

let draggedItem = ref<HTMLElement>();

/**
 * @param {DragEvent} e
 * @returns {void}
 * @description Handle the drag start event and set the dragged item.
 */
const handleDragStart = (e: DragEvent) => {
  draggedItem.value = e.target as HTMLElement;
};

/**
 * @param {DragEvent} e
 * @returns {void}
 * @description Handle the drag over event and insert the dragged item after the target item, but only if the target is a sheet-item.
 */
const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  let target = e.target as HTMLElement;

  // Check if the target is not a sheet-item
  if (!target.classList.contains("sheet-item")) {
    // Find the closest sheet-item parent
    target = target.closest(".sheet-item") as HTMLElement;
  }

  // Check if the target is not null and is a sheet-item
  if (target && target.classList.contains("sheet-item")) {
    target.parentNode?.insertBefore(
      draggedItem.value as HTMLElement,
      target.nextSibling,
    );
  }
};

/**
 * @returns {void}
 * @description Handle the drag end event and set the dragged item to undefined.
 */
const handleDragEnd = () => {
  draggedItem.value = undefined;
};

onMounted(() => {
  const items = document.querySelectorAll(".sheet-item");
  items.forEach((item) => {
    (item as HTMLElement).addEventListener("dragstart", handleDragStart);
    (item as HTMLElement).addEventListener("dragover", handleDragOver);
    item.addEventListener("dragend", handleDragEnd);
  });
});

const sheetSizes = {
  a4: {
    // width: 794p,
    width: "790px",
    // height: 1123,
    height: "1100px",
  },
};

const sheetStyles: StyleValue = {
  padding: "1rem",
  width: sheetSizes.a4.width,
  height: sheetSizes.a4.height,
};

const sheetContentStyles: StyleValue = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  columnGap: "3rem",
  alignContent: "baseline",
  height: "inherit",
};

const items = {
  text: [
    "M519x515S1005f498x485S26501481x486",
    "Opa, bem!",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "Opa, como 'tá?",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "Opa, como vai?",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "Opa, bão",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "Opa, como está! ALKSDANS DASD ALSKDANS DALKSJDADN SDK.VS DLFKJSD FKSDKN",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "Opa, bem!",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "Opa, como 'tá?",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "Opa, como vai?",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "Opa, bão",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "Opa, bem!",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "Opa, como 'tá?",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "Opa, como vai?",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "Opa, bão",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "Opa",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "Opa, bem!",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "Opa, como 'tá?",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "Opa, como vai?",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "Opa, bão",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "Opa",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "Opa, bem!",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "Opa, como 'tá?",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "Opa, como vai?",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "Opa, bão",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "Opa",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
  ],
};
</script>
<template>
  <div class="sheet-container" :style="sheetStyles">
    <div class="sheet-content" :style="sheetContentStyles">
      <PageItem
        draggable="true"
        class="sheet-item"
        v-for="item in items.text"
        :key="item"
        :item="item"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.sheet-container {
  background-color: white;
  border: 1px solid rgb(0, 0, 0, 0.2);
  overflow: hidden;

  .sheet-content {
    overflow: hidden;

    .sheet-item {
      cursor: grab;
    }
  }
}

@media screen and (max-width: 600px) {
  .sheet-container {
    width: 100% !important;
    height: 100% !important;
  }
}

@media print {
  .sheet-container {
    border: none !important;
  }
}
</style>
