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
import SignColumn from "@/components/common/SignColumn/SignColumn.vue";

type PageItemProps = {
  item: PageItemType;
};
const props = defineProps<PageItemProps>();
</script>
<template>
  <div class="page-item" :id="props.item.id">
    <SignColumn v-if="props.item.type === 'sign'">
      <SignComponent :sign="props.item.details as SignDetails" />
    </SignColumn>
    <!---->
    <SignColumn v-else-if="props.item.type === 'signPunctuation'">
      <SignPunctuation :sign="props.item.details as SignDetails" />
    </SignColumn>
    <!---->
    <SignColumn v-else-if="props.item.type === 'punctuation'">
      <PunctuationComponent :type="props.item.details as PunctuationDetails" />
    </SignColumn>
    <!---->
    <CaretComponent v-else-if="props.item.type === 'caret'" />
    <!---->
    <SignColumn v-else-if="props.item.type === 'number'">
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
  //
  max-width: 20rem;
}

@media screen and (max-width: 600px) {
  .page-item {
    max-width: 50%;
  }
}
</style>
