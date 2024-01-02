<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";

type PageItemProps = {
  item: string;
};
const props = defineProps<PageItemProps>();
</script>
<template>
  <div class="page-item">
    <AlphabetDisplay :word="props.item"></AlphabetDisplay>
  </div>
</template>
<style scoped lang="scss"></style>
