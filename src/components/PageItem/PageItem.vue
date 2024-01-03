<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";
import DraggableItemV2 from "../DraggableItem/DraggableItemV2.vue";
import ResizableItem from "@/components/ResizableItem/ResizableItem.vue";

type PageItemProps = {
  item: string;
};
const props = defineProps<PageItemProps>();
</script>
<template>
  <DraggableItemV2>
    <ResizableItem>
      <div class="page-item">
        <AlphabetDisplay :word="props.item"></AlphabetDisplay>
      </div>
    </ResizableItem>
  </DraggableItemV2>
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
}

@media screen and (max-width: 600px) {
  .page-item {
    max-width: 50%;
  }
}
</style>
