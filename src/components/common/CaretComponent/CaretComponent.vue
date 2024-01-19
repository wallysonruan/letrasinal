<script setup lang="ts">
import { computed } from "vue";
import pageStore from "../../../stores/PageStore";

const activate = computed(() => {
  return pageStore().pageOnFocus;
});
const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(1).writingMode;
});
</script>
<template>
  <div v-show="activate" class="caret" :writing-mode="writingMode"></div>
</template>
<style scoped lang="scss">
.caret {
  position: relative;

  &::after {
    position: absolute;
    content: "";
    display: block;
    background-color: black;
    animation: pulse 1s infinite;

    @keyframes pulse {
      0% {
        opacity: 1;
      }
      40% {
        opacity: 0;
      }
    }
  }

  &[writing-mode="vertical"]::after {
    height: 2px;
    min-width: 3rem;
    width: 100%;
  }

  &[writing-mode="horizontal"]::after {
    width: 2px;
    min-height: 3rem;
    height: 100%;
  }
}
</style>
