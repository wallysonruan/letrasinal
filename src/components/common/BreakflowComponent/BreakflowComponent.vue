<script setup lang="ts">
import { computed } from "vue";
import pageStore from "../../../stores/PageStore";
import { onMounted, ref, watch } from "vue";

type BreakFlowComponentProps = {
  id: string;
};

const props = defineProps<BreakFlowComponentProps>();

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
  const parentOffsetTop = parent.offsetTop;
  const unoccupiedHeight =
    pageStore().getSheetSize(1).height - parentOffsetTop - 5;
  height.value = unoccupiedHeight;
}

function unsetVerticalHeight() {
  height.value = 0;
}

function setHorizontalWidth(parent: HTMLElement) {
  const parentOffsetLeft = parent.offsetLeft;
  const unoccupiedWidth =
    pageStore().getSheetSize(1).width - parentOffsetLeft - 5;
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

const pageText = computed(() => pageStore().getPageText(1) ?? []);

onMounted(adjustBreakflowDimensions);
watch(writingMode, adjustBreakflowDimensions);
watch(pageText, adjustBreakflowDimensions);
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
