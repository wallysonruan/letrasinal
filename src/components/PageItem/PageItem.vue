<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";
import type { PageItemType, SignDetails } from "@/stores/PageStore";
import SignComponent from "../common/SignComponent/SignComponent.vue";

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
    ></SignComponent>
    <SignPunctuation
      v-else-if="props.item.type === 'signPunctuation'"
      :sign="props.item.details as SignDetails"
    >
    </SignPunctuation>
    <AlphabetDisplay
      v-else
      :word="(props.item.details as SignDetails).fsw"
    ></AlphabetDisplay>
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
}

@media screen and (max-width: 600px) {
  .page-item {
    max-width: 50%;
  }
}
</style>
