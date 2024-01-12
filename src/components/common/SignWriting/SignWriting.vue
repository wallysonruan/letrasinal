<script setup lang="ts">
import { isFswType, isValidFswString } from "@/utils/SignWritingUtilities";

const props = defineProps<{
  fsw: string;
}>();

const isValidFsw = isValidFswString(props.fsw);
const isPunctuation = isFswType(props.fsw, "punctuation");
</script>
<template>
  <div class="sign" v-if="isValidFsw">
    <fsw-symbol v-if="isPunctuation" :symbol="props.fsw" />
    <fsw-sign :sign="props.fsw" v-else />
  </div>
</template>
<style scoped lang="scss">
.sign {
  text-align: center;
}
</style>
