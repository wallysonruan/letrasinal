<script setup lang="ts">
import { computed } from "vue";
import pageStore from "../../../stores/PageStore";
import { onMounted, ref, watch } from "vue";

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

const DEFAULT_BREAKFLOW_HEIGHT = 50;
const DEFAULT_BREAKFLOW_WIDTH = 50;
const height = ref<number>(DEFAULT_BREAKFLOW_HEIGHT);
const width = ref<number>(DEFAULT_BREAKFLOW_WIDTH);

function getPreviousItem() {
  const previousItem = pageStore().getPageItemPreviousSibling(props.id);
  return previousItem?.type === "breakflow" ? null : previousItem;
}

/**
 * @description This function gets the page item that is placed before the current breakflow and calculates the unoccupied space between it and the end of the page. Then it sets the height or width of the breakflow component to the unoccupied space.
 *
 *  E.g.:
 *      Height of .page-content element
 *   -  offsetTop of previous page item
 *      clientHeight of previous page item
 *   ----------------------------------------
 *   =  unoccupied space to be taken by breakflow
 */
function setDimensions(
  defaultDimension: number,
  dimensionRef: { value: number },
  getUnoccupiedSpace: (previousPageItem: HTMLElement) => number,
) {
  const previousItem = getPreviousItem();

  if (!previousItem) {
    dimensionRef.value = defaultDimension;
    return;
  }

  const previousItemPageItem = document.querySelector(
    `.page-item[id="${previousItem.id}"]`,
  ) as HTMLElement;
  dimensionRef.value = getUnoccupiedSpace(previousItemPageItem) - 3;
}

function setVerticalHeight() {
  width.value = DEFAULT_BREAKFLOW_WIDTH;
  const pageContenVisibletHeight = (
    document.querySelector(".page-content") as HTMLElement
  ).clientHeight;

  setDimensions(pageContenVisibletHeight, height, (previousItemPageItem) => {
    const unoccupiedHeight =
      pageContenVisibletHeight -
      ((previousItemPageItem?.offsetTop ?? 0) +
        (previousItemPageItem?.clientHeight ?? 0));
    return unoccupiedHeight;
  });
}

function setHorizontalWidth() {
  height.value = DEFAULT_BREAKFLOW_HEIGHT;
  const pageContenVisibletWidth = (
    document.querySelector(".page-content") as HTMLElement
  ).clientWidth;

  setDimensions(pageContenVisibletWidth, width, (previousItemPageItem) => {
    const unoccupiedWidth =
      pageContenVisibletWidth -
      ((previousItemPageItem?.offsetLeft ?? 0) +
        (previousItemPageItem?.offsetWidth ?? 0));
    return unoccupiedWidth;
  });
}

function adjustBreakflowDimensions() {
  if (writingMode.value === "vertical") {
    setVerticalHeight();
  }

  if (writingMode.value === "horizontal") {
    setHorizontalWidth();
  }
}

onMounted(() => {
  adjustBreakflowDimensions();
});

watch([writingMode, pageOrientation], () => {
  adjustBreakflowDimensions();
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
  background-color: rgb(208, 200, 200, 0.3);
  border: 2px dashed rgb(163, 160, 160, 0.3);
}
</style>
