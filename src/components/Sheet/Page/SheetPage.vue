<script setup lang="ts">
import { computed } from "vue";
import type { PageItemType } from "../../../stores/PageStore";
import pageStore from "../../../stores/PageStore";
import PageItem from "../PageItem/PageItem.vue";

type PagepageProps = {
  id: number;
  text: PageItemType[];
};

const props = defineProps<PagepageProps>();

const pageWidth = computed(() => {
  return pageStore().getPageOrientation(props.id) === "portrait"
    ? pageStore().getSheetSize(props.id).width
    : pageStore().getSheetSize(props.id).height;
});
const pageHeight = computed(() => {
  return pageStore().getPageOrientation(props.id) === "landscape"
    ? pageStore().getSheetSize(props.id).width
    : pageStore().getSheetSize(props.id).height;
});
</script>
<template>
  <div
    class="page"
    :pageId="props.id"
    @dblclick="pageStore().placeCaretAtTheEnd"
  >
    <div
      class="page-container"
      :style="`width: ${pageWidth}px; height: ${pageHeight}px;`"
    >
      <div
        class="page-content"
        :writing-mode="
          pageStore().getWritingConfiguration(props.id).writingMode
        "
      >
        <PageItem
          @click="pageStore().placeCaretBeforeItemById(word.id)"
          @touchstart="pageStore().placeCaretBeforeItemById(word.id)"
          :item="word"
          :pageId="props.id"
          v-for="(word, index) in props.text"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  overflow: scroll;

  .page-container {
    padding: 1rem 1rem;
    background-color: white;
    border: 1px solid rgb(0, 0, 0, 0.2);
  }

  .page-content {
    display: flex;
    flex-wrap: wrap;
    align-content: baseline;
    height: 100%;
    width: 100%;

    &:hover {
      cursor: text;
    }

    &[writing-mode="vertical"] {
      flex-direction: column;
      column-gap: 1.5rem;
    }

    &[writing-mode="horizontal"] {
      flex-direction: row;
      row-gap: 1.5rem;
    }
  }
}

@media screen and (max-width: 600px) {
  .page {
    display: block;
  }
  .page-container {
    .page-content {
      overflow: auto;
    }
  }
}

@media print {
  .page-container {
    border: none !important;
  }
}
</style>
