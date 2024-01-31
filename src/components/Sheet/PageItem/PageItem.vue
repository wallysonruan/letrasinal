<script setup lang="ts">
import pageStore, {
  type PageItemType,
  type PunctuationDetails,
  type SignDetails,
  type NumberDetails,
  type SignPunctuationDetails,
} from "../../../stores/PageStore";
import SignComponent from "../../common/SignComponent/SignComponent.vue";
import SignPunctuation from "../../common/SignPunctuation/SignPunctuation.vue";
import PunctuationComponent from "../../common/PunctuationComponent/PunctuationComponent.vue";
import BreakflowComponent from "@/components/common/BreakflowComponent/BreakflowComponent.vue";
import CaretComponent from "@/components/common/CaretComponent/CaretComponent.vue";
import NumberComponent from "@/components/common/NumberComponent/NumberComponent.vue";
import SignColumn from "@/components/common/SignColumn/SignColumn.vue";
import { computed } from "vue";
import { watch } from "vue";
import { ref } from "vue";

type PageItemProps = {
  pageId: number;
  item: PageItemType;
};
const props = defineProps<PageItemProps>();

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(props.pageId).writingMode;
});

const reRenderingNecessary = computed(() => {
  const pageText = pageStore().getPageText(1);
  const item = pageText?.find((item) => item.id === props.item.id);
  const details = item?.details as SignDetails | SignPunctuationDetails;

  if (details === undefined) {
    return;
  }

  return details.style?.fontSize;
});

const key = ref<number>(0); // This is a hack to force re-rendering of the component

watch(reRenderingNecessary, () => {
  if (reRenderingNecessary.value !== undefined) {
    key.value++;
  }
});
</script>
<template>
  <div class="page-item" :id="props.item.id" :writing-mode="writingMode">
    <SignColumn
      v-if="props.item.type === 'sign'"
      :item-id="props.item.id"
      :column="(props.item.details as SignDetails).column"
      :page-item-type="props.item.type"
      :page-id="props.pageId"
      >
      <SignComponent :sign="props.item.details as SignDetails" :key="key" />
    </SignColumn>
    <!---->
    <SignColumn
    v-else-if="props.item.type === 'signPunctuation'"
      :item-id="props.item.id"
      :column="(props.item.details as SignDetails).column"
      :page-item-type="props.item.type"
      :page-id="props.pageId"
      >
      <SignPunctuation
      :sign="props.item.details as SignPunctuationDetails"
        :key="key"
        :page-id="props.pageId"
        />
      </SignColumn>
      <!---->
      <PunctuationComponent
      v-else-if="props.item.type === 'punctuation'"
      :type="props.item.details as PunctuationDetails"
      :page-id="props.pageId"
      />
      <!---->
      <BreakflowComponent
      v-else-if="props.item.type === 'breakflow'"
      :id="props.item.id"
      :page-id="props.pageId"
      />
      <!---->
      <CaretComponent
      v-else-if="props.item.type === 'caret'"
      :page-id="props.pageId"
      />
      <!---->
      <SignColumn
      v-else-if="props.item.type === 'number'"
      :item-id="props.item.id"
      :column="(props.item.details as NumberDetails).column"
      :page-item-type="props.item.type"
      :page-id="props.pageId"
    >
      <NumberComponent :number="props.item.details as NumberDetails" 
      :page-id="props.pageId"
      />
    </SignColumn>
    <!---->
  </div>
</template>
<style scoped lang="scss">
.page-item {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  cursor: pointer;

  &[writing-mode="vertical"] {
    max-width: 20rem;
  }
}

@media screen and (max-width: 600px) {
  .page-item {
    max-width: 50%;
  }
}
</style>
