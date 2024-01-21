<script setup lang="ts">
import { computed } from "vue";
import pageStore from "../../../stores/PageStore";
import { onMounted, ref, watch } from "vue";
import { nextTick } from "process";

type BreakFlowComponentProps = {
  id: string;
};

const props = defineProps<BreakFlowComponentProps>();

const pageOrientation = computed(() => {
  return pageStore().getPageOrientation(1);
});

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(1).writingMode;
});

const height = ref<number>(100);
const width = ref<number>(100);

function getBreakflowElement(id: string): HTMLElement | null {
  const breakflow = document.querySelector(`.breakflow[id="${id}"]`);
  return breakflow as HTMLElement | null;
}

function getParentElement(element: HTMLElement | null): HTMLElement | null {
  return element?.parentElement as HTMLElement | null;
}

function setVerticalHeight(parent: HTMLElement) {
  const negativePaddingToPreventOverflow = 5; // Without this component may take an entire line only for itself.
  const parentOffsetTop = parent.offsetTop;
  const unoccupiedHeight =
    pageStore().getSheetSize(1).height -
    parentOffsetTop -
    negativePaddingToPreventOverflow;
  height.value = unoccupiedHeight;
}

function unsetVerticalHeight() {
  height.value = 0;
}

function setHorizontalWidth(parent: HTMLElement) {
  const negativePaddingToPreventOverflow = 5; // Without this component may take an entire line only for itself.
  const parentOffsetLeft = parent.offsetLeft;
  let unoccupiedWidth = 0;

  if (pageOrientation.value === "landscape") {
    unoccupiedWidth =
      pageStore().getSheetSize(1).height -
      parentOffsetLeft -
      negativePaddingToPreventOverflow;
  } else {
    unoccupiedWidth =
      pageStore().getSheetSize(1).width -
      parentOffsetLeft -
      negativePaddingToPreventOverflow;
  }

  width.value = unoccupiedWidth;
}

function unsetHorizontalWidth() {
  width.value = 0;
}

function unsetAllDimensions() {
  unsetVerticalHeight();
  unsetHorizontalWidth();
}

function adjustBreakflowDimensions() {
  unsetAllDimensions();
  const breakflow = getBreakflowElement(props.id);
  const parent = getParentElement(breakflow);

  if (breakflow && parent) {
    if (writingMode.value === "vertical") {
      unsetHorizontalWidth();
      setVerticalHeight(parent);
    }

    if (writingMode.value === "horizontal") {
      unsetVerticalHeight();
      setHorizontalWidth(parent);
    }
  }
}

onMounted(() => {
  // This is a hack to make sure that the breakflow component is rendered before we try to adjust its dimensions.
  // For some reason the browser needs both the nextTick and the setTimeout to redimension the component properly.
  nextTick(() => {
    setTimeout(() => {
      adjustBreakflowDimensions();
    }, 7);
  });
});

watch(writingMode, () => {
  // This is a hack to make sure that the breakflow component is rendered before we try to adjust its dimensions.
  // For some reason the browser needs both the nextTick and the setTimeout to redimension the component properly.
  nextTick(() => {
    setTimeout(() => {
      adjustBreakflowDimensions();
    }, 7);
  });
});
</script>
<template>
  <div
    :class="'breakflow'"
    :id="props.id"
    :writing-mode="writingMode"
    :style="{
      height: height + 'px',
      width: width + 'px',
    }"
  ></div>
</template>
