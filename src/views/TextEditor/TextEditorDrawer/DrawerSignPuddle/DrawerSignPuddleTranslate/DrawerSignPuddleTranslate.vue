<script setup lang="ts">
import { ref } from "vue";

const text = ref("");
// const words = computed(() => {
//   const words = text.value.split(" ");
//   const notEmpty = words.filter((word) => word !== "");
//   return notEmpty;
// });
</script>
<template>
  <div>
    <br />
    <v-textarea v-model="text" label="Texto" rows="3" variant="outlined" />
  </div>
</template>
