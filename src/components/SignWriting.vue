<script setup lang="ts">
import { isType } from "@sutton-signwriting/core/fsw";

const props = defineProps<{
  fsw: string;
  maxHeight?: string;
}>();

const maxHeight = props.maxHeight ? props.maxHeight : "20";
</script>

<template>
  <div
    class="signwriting-container"
    :style="'max-height:' + maxHeight + 'rem;'"
  >
    <div class="sign">
      <fsw-sign :sign="props.fsw" v-if="!isType(props.fsw, 'punctuation')" />
      <fsw-symbol :symbol="props.fsw" v-if="isType(props.fsw, 'punctuation')" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.signwriting-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  .sign {
    text-align: center;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    &:not(:last-child) {
      margin-bottom: 0.3rem;
    }
  }
}
</style>
