<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";

type PageItemProps = {
  item: string;
};
const props = defineProps<PageItemProps>();
</script>
<template>
  <div>
    <AlphabetDisplay :word="props.item"></AlphabetDisplay>
  </div>
</template>
