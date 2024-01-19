<script setup lang="ts">
import SignWriting from "../SignWriting/SignWriting.vue";
import type { SignPunctuationDetails } from "../../../stores/PageStore";
import pageStore from "../../../stores/PageStore";
import { computed } from "vue";

type SignPunctuationProps = {
  sign: SignPunctuationDetails;
};

const props = defineProps<SignPunctuationProps>();

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(1).writingMode;
});
</script>
<template>
  <div class="sign-punctuation" :writing-mode="writingMode">
    <SignWriting
      v-if="writingMode === 'vertical'"
      :fsw="props.sign.fsw.vertical"
    ></SignWriting>
    <SignWriting
      v-if="writingMode === 'horizontal'"
      :fsw="props.sign.fsw.horizontal"
    ></SignWriting>
  </div>
</template>
<style scoped lang="scss">
.sign-punctuation {
  &[writing-mode="vertical"] {
    margin-top: 0.1rem;
    line-height: 0.5rem;
  }
}
</style>
