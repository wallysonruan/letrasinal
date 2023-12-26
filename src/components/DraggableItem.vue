<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    item.addEventListener("dragstart", () => {
      // Adding dragging class to item after a delay
      setTimeout(() => item.classList.add("dragging"), 0);
    });

    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
  });
});
</script>
<template>
  <li class="item" draggable="true">
    <div class="details">
      <slot></slot>
    </div>
  </li>
</template>
