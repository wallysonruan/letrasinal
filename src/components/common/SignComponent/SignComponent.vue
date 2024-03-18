<script setup lang="ts">
import SignWriting from "@/components/common/SignWriting/SignWriting.vue";
import type { SignDetails } from "@/stores/PageStore";

type SignComponentProps = {
  sign: SignDetails;
};

const props = defineProps<SignComponentProps>();
</script>
<template>
  <div class="sign-component">
    <SignWriting :fsw="props.sign.fsw" />
  </div>
</template>
