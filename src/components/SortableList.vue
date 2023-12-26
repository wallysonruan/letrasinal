<script setup lang="ts">
import { onMounted } from "vue";

function main() {
  const sortableList = document.querySelector(
    ".sortable-list",
  ) as HTMLUListElement;

  const initSortableList = (e: DragEvent) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");

    // Getting all items except currently dragging and making array of them
    let siblings = Array.from(
      sortableList.querySelectorAll(".item:not(.dragging)"),
    ) as HTMLElement[];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find((sibling) => {
      return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

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
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
</style>