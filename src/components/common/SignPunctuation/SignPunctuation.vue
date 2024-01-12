<script setup lang="ts">
import SignWriting from "../SignWriting/SignWriting.vue";
import type { SignDetails } from "../../../stores/PageStore";

type SignPunctuationProps = {
  sign: SignDetails;
};

const props = defineProps<SignPunctuationProps>();
</script>
<template>
  <SignWriting :fsw="props.sign.fsw"></SignWriting>
</template>
