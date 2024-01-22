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

type PageItemProps = {
  item: PageItemType;
};
const props = defineProps<PageItemProps>();

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(1).writingMode;
});
</script>
<template>
  <div class="page-item" :id="props.item.id" :writing-mode="writingMode">
    <SignColumn
      v-if="props.item.type === 'sign'"
      :item-id="props.item.id"
      :column="(props.item.details as SignDetails).column"
      :page-item-type="props.item.type"
    >
      <SignComponent :sign="props.item.details as SignDetails" />
    </SignColumn>
    <!---->
    <SignColumn
      v-else-if="props.item.type === 'signPunctuation'"
      :item-id="props.item.id"
      :column="(props.item.details as SignDetails).column"
      :page-item-type="props.item.type"
    >
      <SignPunctuation :sign="props.item.details as SignPunctuationDetails" />
    </SignColumn>
    <!---->
    <PunctuationComponent
      v-else-if="props.item.type === 'punctuation'"
      :type="props.item.details as PunctuationDetails"
    />
    <!---->
    <BreakflowComponent
      v-else-if="props.item.type === 'breakflow'"
      :id="props.item.id"
    />
    <!---->
    <CaretComponent v-else-if="props.item.type === 'caret'" />
    <!---->
    <SignColumn
      v-else-if="props.item.type === 'number'"
      :item-id="props.item.id"
      :column="(props.item.details as NumberDetails).column"
      :page-item-type="props.item.type"
    >
      <NumberComponent :number="props.item.details as NumberDetails" />
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