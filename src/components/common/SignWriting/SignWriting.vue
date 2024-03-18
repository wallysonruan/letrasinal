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
      :style="`color: ${props.color};`"
    />
    <fsw-sign v-else :sign="props.fsw" :style="`color: ${props.color};`" />
  </div>
</template>
