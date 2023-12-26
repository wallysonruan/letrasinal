<script setup lang="ts">
import { onMounted } from 'vue';

type SortableListProps = {
  items: Array<string>;
};

const props = defineProps<SortableListProps>();

function main() {
  const sortableList = document.querySelector(
    ".sortable-list",
  ) as HTMLUListElement;

  const items = sortableList.querySelectorAll(".item");

  items.forEach((item) => {
    item.addEventListener("dragstart", () => {
      // Adding dragging class to item after a delay
      setTimeout(() => item.classList.add("dragging"), 0);
    });
    
    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
  });

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
    <li class="item" draggable="true" v-for="(item, index) in items" :key="index">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>
