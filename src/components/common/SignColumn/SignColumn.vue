<script setup lang="ts">
import { computed, ref } from "vue";

import SignToolBox from "./SignToolBox/SignToolBox.vue";
import type {
  PageItemType,
  PageItemTypes,
  SignDetails,
} from "@/stores/PageStore";
import pageStore from "@/stores/PageStore";

type SignColumnProps = {
  pageId: number;
  itemId: string;
  pageItemType: PageItemTypes;
  item: PageItemType;
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

function handleCloseToolBox() {
  setToolboxDisplay(false);
  pageStore().setPageOnFocus(true);
}

function columnStyle() {
  if ((props.item.details as SignDetails)?.fsw) {
    switch ((props.item.details as SignDetails).fsw[0]) {
      case "L":
        return "grid-column: 1;";
      case "M":
        return "grid-column: 2;";
      case "R":
        return "grid-column: 3;";
      default: // Middle
        return "grid-column: 2;";
    }
  }
}

const fswIfPresent = computed(() => {
  return (props.item.details as SignDetails)?.fsw;
});

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(props.pageId).writingMode;
});

const activateColumns = computed(() => {
  return pageStore().shouldActivateColumns();
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
    :activate="activateColumns"
    :active="showToolbox"
    :right="showColumns.right"
    :middle="showColumns.middle"
    :left="showColumns.left"
  >
    <SignToolBox
      :pageId="props.pageId"
      :active="showToolbox"
      :item-id="props.itemId"
      :fsw="fswIfPresent"
      @closeToolbox="handleCloseToolBox"
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
  padding: 0 0.5rem 0 0.5rem;

  &[right="true"] {
    border-right: 0.5px black solid;
  }
  &[left="true"] {
    border-left: 0.5px black solid;
  }

  &[middle="true"] {
    &::before {
      content: "";
      position: absolute;
      top: 0%;
      left: 50%;
      height: 100%;
      width: 0.5px;
      border-right: 0.5px dashed black;
    }
  }

  &[writing-mode="vertical"] {
    &[activate="true"] {
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
