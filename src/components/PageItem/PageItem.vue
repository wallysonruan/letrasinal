<script lang="ts">
type SignDetails = {
  fsw: string;
  words: string[];
};

type SignParagraphDetails = {
  signs: SignDetails[];
};

type TextDetails = {
  text: string;
};

type TextParagraphDetails = {
  text: string;
};

export type PageItemType = {
  id: string;
  type: "sign" | "signParagraph" | "text" | "textParagraph";
  details:
    | SignDetails
    | SignParagraphDetails
    | TextDetails
    | TextParagraphDetails;
};
</script>
<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";

type PageItemProps = {
  item: PageItemType;
};
const props = defineProps<PageItemProps>();
</script>
<template>
  <div class="page-item" :id="props.item.id">
    <AlphabetDisplay
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
