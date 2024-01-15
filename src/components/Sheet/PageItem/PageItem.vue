<script setup lang="ts">
import {
  type PageItemType,
  type PunctuationDetails,
  type SignDetails,
  type NumberDetails,
} from "../../../stores/PageStore";
import SignComponent from "../../common/SignComponent/SignComponent.vue";
import SignPunctuation from "../../common/SignPunctuation/SignPunctuation.vue";
import PunctuationComponent from "../../common/PunctuationComponent/PunctuationComponent.vue";
import CaretComponent from "@/components/common/CaretComponent/CaretComponent.vue";
import NumberComponent from "@/components/common/NumberComponent/NumberComponent.vue";

type PageItemProps = {
  item: PageItemType;
};
const props = defineProps<PageItemProps>();
</script>
<template>
  <div class="page-item" :id="props.item.id">
    <SignComponent
      v-if="props.item.type === 'sign'"
      :sign="props.item.details as SignDetails"
    />
    <SignPunctuation
      v-else-if="props.item.type === 'signPunctuation'"
      :sign="props.item.details as SignDetails"
    />
    <PunctuationComponent
      v-else-if="props.item.type === 'punctuation'"
      :type="props.item.details as PunctuationDetails"
    />
    <CaretComponent v-else-if="props.item.type === 'caret'" />
    <NumberComponent
      v-else-if="props.item.type === 'number'"
      :number="props.item.details as NumberDetails"
    />
  </div>
</template>
<style scoped lang="scss">
.page-item {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  //
  max-width: 20rem;
}

@media screen and (max-width: 600px) {
  .page-item {
    max-width: 50%;
  }
}
</style>
