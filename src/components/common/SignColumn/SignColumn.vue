<script setup lang="ts">
import { computed, ref } from "vue";

import SignToolBox from "./SignToolBox/SignToolBox.vue";
import type { ColumnTypes, PageItemTypes } from "@/stores/PageStore";
import pageStore from "@/stores/PageStore";

type SignColumnProps = {
  itemId: string;
  column: ColumnTypes;
  pageItemType: PageItemTypes;
};

const props = defineProps<SignColumnProps>();

let pressTimer: NodeJS.Timeout | null = null;
const showToolbox = ref<boolean>(false);

function setToolboxDisplay(mode: boolean) {
  showToolbox.value = mode;
}

function handlePressStart() {
  pressTimer = setTimeout(() => {
    setToolboxDisplay(true);
  }, 1500); // 1500ms = 1.5 seconds
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

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(1).writingMode;
});
</script>
<template>
  <div
    class="sign-column-container"
    @touchstart="handlePressStart"
    @touchend="handlePressEnd"
    @mousedown="handlePressStart"
    @mouseup="handlePressEnd"
    :writing-mode="writingMode"
  >
    <SignToolBox
      :active="showToolbox"
      :item-id="props.itemId"
      :page-item-type="props.pageItemType"
      @closeToolbox="setToolboxDisplay(false)"
    />
    <!--  -->
    <div class="sign-column-item" :style="columnStyle()">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.sign-column-container {
  position: relative;

  &[writing-mode="vertical"] {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
