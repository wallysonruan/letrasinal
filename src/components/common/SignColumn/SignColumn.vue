<script setup lang="ts">
import { ref } from "vue";

import SignToolBox from "./SignToolBox/SignToolBox.vue";
import type { ColumnTypes } from "@/stores/PageStore";

type SignColumnProps = {
  itemId: string;
  column: ColumnTypes;
};

const props = defineProps<SignColumnProps>();

let pressTimer: NodeJS.Timeout | null = null;
const showToolbox = ref<"none" | "block">("none");

function setToolboxDisplay(mode: "none" | "block") {
  showToolbox.value = mode;
}

function handlePressStart() {
  pressTimer = setTimeout(() => {
    setToolboxDisplay("block");
  }, 1000); // 2000ms = 2 seconds
}

function handlePressEnd() {
  if (pressTimer !== null) {
    clearTimeout(pressTimer);
    pressTimer = null;
  }
}

function columnStyle() {
  switch (props.column) {
    case "left":
      return "grid-column: 1;";
    case "middle":
      return "grid-column: 2;";
    case "right":
      return "grid-column: 3;";
  }
}
</script>
<template>
  <div
    class="sign-column-container"
    @touchstart="handlePressStart"
    @touchend="handlePressEnd"
    @mousedown="handlePressStart"
    @mouseup="handlePressEnd"
  >
    <SignToolBox :style="`display: ${showToolbox};`" :item-id="props.itemId" />
    <!--  -->
    <div class="sign-column-item" :style="columnStyle()">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.sign-column-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
