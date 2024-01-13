<script setup lang="ts">
import { computed } from "vue";
import pageStore from "../../../stores/PageStore";

const activate = computed(() => {
  return pageStore().pageOnFocus;
});
</script>
<template>
  <div v-show="activate" class="caret"></div>
</template>
<style scoped lang="scss">
.caret {
  position: relative;

  &::after {
    position: absolute;
    content: "";
    display: block;
    height: 2px;
    min-width: 2rem;
    width: 100%;
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
}
</style>
