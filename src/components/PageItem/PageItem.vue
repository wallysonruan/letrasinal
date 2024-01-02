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
<style scoped lang="scss">
.page-item {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1rem 0;
  //
  overflow: auto; // resize need this

  &:hover {
    resize: both;
    border: 1px solid rgb(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    padding-bottom: 0%;
  }
}
</style>
