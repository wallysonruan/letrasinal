<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const sortableList = document.querySelector(
    ".sortable-list",
  ) as HTMLUListElement;
  main(sortableList);
});

function main(sortableList: HTMLUListElement) {
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
</script>
<template>
  <div>
    <ul class="sortable-list">
      <li class="item" draggable="true">
        <div class="details">
          <fsw-sign
            sign="M519x537S15a02492x504S2bf00492x464S2fc04481x526"
          ></fsw-sign>
        </div>
      </li>
      <li class="item" draggable="true">
        <div class="details">
          <fsw-sign
            sign="M519x537S15a02492x504S2bf00492x464S2fc04481x526"
          ></fsw-sign>
        </div>
      </li>
    </ul>
  </div>
</template>
