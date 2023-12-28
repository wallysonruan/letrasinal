<script setup lang="ts">
import { isType } from "@sutton-signwriting/core/fsw";

const props = defineProps<{
  fsw: string;
  maxHeight?: string;
}>();

const isPunctuation = isType(props.fsw, "punctuation");
</script>
<template>
  <div class="sign">
    <fsw-symbol v-if="isPunctuation" :symbol="props.fsw" />
    <fsw-sign :sign="props.fsw" v-else />
  </div>
</template>
<style scoped lang="scss">
.sign {
  text-align: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.7rem;
}
</style>
