<script setup lang="ts">
import { onMounted, ref } from "vue";

let draggedItem = ref<HTMLElement>();
const draggableItemClass = "draggable-item";

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
 * @description Handle the drag over event and insert the dragged item after the target item, but only if the target is a draggable-item.
 */
const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  let target = e.target as HTMLElement;

  // Check if the target is not a draggable-item.
  if (!target.classList.contains(draggableItemClass)) {
    // Find the closest draggable-item parent
    target = target.closest(`.${draggableItemClass}`) as HTMLElement;
  }

  // Check if the target is not null and is a draggable-item.
  if (target && target.classList.contains(draggableItemClass)) {
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
  const items = document.querySelectorAll(`.${draggableItemClass}`);
  items.forEach((item) => {
    (item as HTMLElement).addEventListener("dragstart", handleDragStart);
    (item as HTMLElement).addEventListener("dragover", handleDragOver);
    item.addEventListener("dragend", handleDragEnd);
  });
});
</script>
<template>
  <div :class="draggableItemClass" draggable="true">
    <slot></slot>
  </div>
</template>
<style lang="scss">
.draggable-item > * {
  cursor: move;
}
</style>
