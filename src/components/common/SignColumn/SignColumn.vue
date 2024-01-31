<script setup lang="ts">
import { computed, ref } from "vue";

// import SignToolBox from "./SignToolBox/SignToolBox.vue";
import type { ColumnTypes, PageItemTypes } from "@/stores/PageStore";
import pageStore from "@/stores/PageStore";

type SignColumnProps = {
  pageId: number;
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
  if (
    props.pageItemType === "caret" ||
    props.pageItemType === "punctuation" ||
    props.pageItemType === "breakflow"
  ) {
    return;
  }
  pressTimer = setTimeout(() => {
    setToolboxDisplay(true);
  }, 300); // 300ms = 0.3 seconds
}

function handlePressEnd() {
  if (pressTimer !== null) {
    clearTimeout(pressTimer);
    pressTimer = null;
  }
}

// function handleCloseToolBox() {
//   setToolboxDisplay(false);
//   pageStore().setPageOnFocus(true);
// }

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
  return pageStore().getWritingConfiguration(props.pageId).writingMode;
});

const showColumns = computed(() => {
  return pageStore().shouldShowColumns();
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
    :columns="showColumns"
  >
    <!-- <SignToolBox
      :pageId="props.pageId"
      :active="showToolbox"
      :item-id="props.itemId"
      :column="props.column"
      @closeToolbox="handleCloseToolBox"
    /> -->
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
    &[columns="true"] {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &[active="true"] {
    border: 1px solid blue;
    border-radius: 3px;
  }
}
</style>
