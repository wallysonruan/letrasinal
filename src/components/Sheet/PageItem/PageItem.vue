<script setup lang="ts">
import type {
  PageItemType,
  PunctuationDetails,
  SignDetails,
} from "../../../stores/PageStore";
import SignComponent from "../../common/SignComponent/SignComponent.vue";
import SignPunctuation from "../../common/SignPunctuation/SignPunctuation.vue";
import PunctuationComponent from "../../common/PunctuationComponent/PunctuationComponent.vue";
import CaretComponent from "@/components/common/CaretComponent/CaretComponent.vue";

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
