<script setup lang="ts">
import SignWriting from "../SignWriting/SignWriting.vue";
import type { SignPunctuationDetails } from "../../../stores/PageStore";
import pageStore from "../../../stores/PageStore";
import { computed } from "vue";

type SignPunctuationProps = {
  pageId: number;
  sign: SignPunctuationDetails;
};

const props = defineProps<SignPunctuationProps>();

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(props.pageId).writingMode;
});
</script>
<template>
  <div class="sign-punctuation" :writing-mode="writingMode">
    <SignWriting
      v-if="writingMode === 'vertical'"
      :fsw="props.sign.fsw.vertical"
      :font-size="props.sign.style?.fontSize"
    ></SignWriting>
    <SignWriting
      v-if="writingMode === 'horizontal'"
      :fsw="props.sign.fsw.horizontal"
      :font-size="props.sign.style?.fontSize"
    ></SignWriting>
  </div>
</template>
<style scoped lang="scss">
.sign-punctuation {
  &[writing-mode="vertical"] {
    margin-top: 0.1rem;
    margin-bottom: 0.6rem;
    line-height: 0.5rem;
  }

  &[writing-mode="horizontal"] {
    margin-left: 0.6rem;
    margin-right: 0.6rem;
    line-height: 0.5rem;
  }
}
</style>
