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
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  //
  max-width: 20rem;
  overflow: auto; // resize need this

  &:hover {
    resize: both;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #0d99ff;
      border-radius: 0.3rem;
    }
  }
}

@media screen and (max-width: 600px) {
  .page-item {
    max-width: 50%;
  }
}

@media print {
  .page-item {
    &:hover {
      &::before {
        border: none !important;
      }
    }
  }
}
</style>
