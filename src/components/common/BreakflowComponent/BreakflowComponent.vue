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
  const negativePaddingToPreventOverflow = 40; // Without this component may take an entire line only for itself.
  // const parentOffsetTop = parent.offsetTop;

  const breakflow = pageStore()
    .getPageText(1)
    ?.find((item) => item.id === props.id);
  const breakflowIndex = pageStore()
    .getPageText(1)
    ?.indexOf(breakflow as any);

  if (breakflowIndex === 0) {
    height.value = pageStore().getSheetSize(1).height;
    return;
  }

  const previousItem =
    pageStore().getPageText(1)?.[(breakflowIndex as number) - 1];

  if (previousItem?.type === "breakflow") {
    height.value = pageStore().getSheetSize(1).height;
    return;
  }

  const previousItemPageItem = document.querySelector(
    `.page-item[id="${previousItem?.id}"]`,
  ) as HTMLElement;
  const previousItemPageItemOffsetTop = previousItemPageItem?.offsetTop;
  console.log(previousItemPageItemOffsetTop);

  const unoccupiedHeight =
    pageStore().getSheetSize(1).height -
    previousItemPageItemOffsetTop -
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
  // unsetAllDimensions();
  const breakflow = getBreakflowElement(props.id);
  const parent = getParentElement(breakflow); // pageItem
  const parentsParent = getParentElement(parent); // pageContent

  if (breakflow && parent && parentsParent) {
    if (writingMode.value === "vertical") {
      // unsetHorizontalWidth();
      setVerticalHeight(parentsParent);
    }

    if (writingMode.value === "horizontal") {
      // unsetVerticalHeight();
      setHorizontalWidth(parentsParent);
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
    class="breakflow"
    :id="props.id"
    :writing-mode="writingMode"
    :style="{
      height: height + 'px',
      width: width + 'px',
    }"
  ></div>
</template>
<style scoped lang="scss">
.breakflow {
  background-color: red;
}
</style>
