<script setup lang="ts">
import SignWriting from "../SignWriting/SignWriting.vue";
import type { SignDetails } from "../../../stores/PageStore";

type SignPunctuationProps = {
  sign: SignDetails;
};

const props = defineProps<SignPunctuationProps>();
</script>
<template>
  <div class="sign-punctuation">
    <SignWriting :fsw="props.sign.fsw"></SignWriting>
  </div>
</template>
<style scoped lang="scss">
.sign-punctuation {
  margin-top: 0.10rem;
  line-height: 0.5rem;
}
</style>