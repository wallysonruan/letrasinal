<script setup lang="ts">
import SortableList from "@/components/SortableList.vue";

const items: string[] = ['apple', 'banana', 'orange'];
</script>
<template>
  <div>
    <SortableList :items="items">
        <template #default="{ item }">
        </template>
    </SortableList>
  </div>
</template>
