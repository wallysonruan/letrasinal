<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";
import { onMounted, ref } from "vue";

type PageItemProps = {
  item: string;
};
const props = defineProps<PageItemProps>();

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
  if (!target.classList.contains("page-item")) {
    // Find the closest sheet-item parent
    target = target.closest(".page-item") as HTMLElement;
  }

  // Check if the target is not null and is a sheet-item
  if (target && target.classList.contains("page-item")) {
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
  const items = document.querySelectorAll(".page-item");
  items.forEach((item) => {
    (item as HTMLElement).addEventListener("dragstart", handleDragStart);
    (item as HTMLElement).addEventListener("dragover", handleDragOver);
    item.addEventListener("dragend", handleDragEnd);
  });
});
</script>
<template>
  <div class="page-item" draggable="true">
    <AlphabetDisplay :word="props.item"></AlphabetDisplay>
  </div>
</template>
<style scoped lang="scss">
.page-item {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  //
  max-width: 20rem;
  overflow: auto; // resize need this

  &:hover {
    resize: both;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #0d99ff;
      border-radius: 0.3rem;
    }
  }
}

@media screen and (max-width: 600px) {
  .page-item {
    max-width: 50%;
  }
}

@media print {
  .page-item {
    &:hover {
      &::before {
        border: none !important;
      }
    }
  }
}
</style>
