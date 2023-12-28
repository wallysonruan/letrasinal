<script setup lang="ts">
import { onMounted } from "vue";

function main() {
  const sortableList = document.querySelector(
    ".sortable-list",
  ) as HTMLUListElement;

  // Modify initSortableList to work with both mouse and touch events
  const initSortableList = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");

    // Getting all items except currently dragging and making array of them
    let siblings = Array.from(
      sortableList.querySelectorAll(".item:not(.dragging)"),
    ) as HTMLElement[];

    // Get clientX and clientY depending on the event type
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find((sibling) => {
      let inSameRow = clientX < sibling.offsetLeft + sibling.offsetWidth;
      return (
        inSameRow && clientY <= sibling.offsetTop + sibling.offsetHeight / 2
      );
    });

    // Add touch event listeners
    sortableList.addEventListener("touchmove", initSortableList);
    sortableList.addEventListener("touchstart", (e) => e.preventDefault());

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem!, nextSibling!);
  };

  sortableList.addEventListener("dragover", initSortableList);
  sortableList.addEventListener("dragenter", (e) => e.preventDefault());
}

onMounted(() => {
  main();
});
</script>
<template>
  <ul class="sortable-list">
    <slot></slot>
  </ul>
</template>
<style scoped lang="scss">
.sortable-list {
  height: inherit;
  width: inherit;
  list-style: none;
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  // Brings all the columns to the left, with no auto-spacing between them
  align-content: baseline;
  // Adds space between the columns
  column-gap: 2rem;
}
</style>
