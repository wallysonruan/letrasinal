<script setup lang="ts">
import { isFswType, isValidFswString } from "@/utils/SignWritingUtilities";

const props = defineProps<{
  fsw: string;
  fontSize?: number;
  color?: string;
}>();

const isValidFsw = isValidFswString(props.fsw);
const isPunctuation = isFswType(props.fsw, "punctuation");
</script>
<template>
  <div class="sign" v-if="isValidFsw">
    <fsw-symbol
      v-if="isPunctuation"
      :symbol="props.fsw"
      :style="`font-size: ${props.fontSize ?? 0.7}rem; color: ${props.color};`"
    />
    <fsw-sign
      v-else
      :sign="props.fsw"
      :style="`font-size: ${props.fontSize ?? 0.7}rem; color: ${props.color};`"
    />
  </div>
</template>
<style scoped lang="scss">
.sign {
  text-align: center;
}
</style>
