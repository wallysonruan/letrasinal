<script setup lang="ts">
import { computed } from "vue";
import pageStore from "../../../stores/PageStore";
import { onMounted } from "vue";

type CaretProps = {
  pageId: number;
};

const props = defineProps<CaretProps>();

const activate = computed(() => {
  return (
    pageStore().pageOnFocus.id === props.pageId && pageStore().pageOnFocus.focus
  );
});
const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(props.pageId).writingMode;
});

function getCaretElement(): HTMLElement | null {
  return document.querySelector(".caret") as HTMLElement | null;
}

function getCaretParentElement(caret: HTMLElement | null): HTMLElement | null {
  return caret?.parentElement as HTMLElement | null;
}

function getPreviousSiblingOfElement(
  element: HTMLElement | null,
): HTMLElement | null {
  return element?.previousElementSibling as HTMLElement | null;
}

function doesElementContainBreakflow(element: HTMLElement | null): boolean {
  const childBreakflow = element?.querySelector(".breakflow");
  return childBreakflow?.classList.contains("breakflow") || false;
}

function adjustCaretDimensions(
  caret: HTMLElement | null,
  isBigger: boolean,
): void {
  if (!caret) {
    return;
  }

  if (isBigger) {
    caret.style.height = "6px";
    caret.style.width = "6px";
  } else {
    caret.style.height = "0%";
    caret.style.width = "0%";
  }
}

// TODO: This is a temporary solution. It should be replaced with a more elegant one.
// The problem is that since caret is an empty component using a pseudo-element to display it,
// it doesn't have any dimensions. This causes the caret to be displayed in the wrong place, i.e.,
// in the end of line/column being broken by Breakflow and not at the beginning of new line/column.
function handleCaretAdjustmentOnMount(): void {
  if (activate.value) {
    const caret = getCaretElement();
    const caretParent = getCaretParentElement(caret);
    const caretParentSiblingBefore = getPreviousSiblingOfElement(caretParent);
    const isSiblingBeforeBreakflowParent = doesElementContainBreakflow(
      caretParentSiblingBefore,
    );

    adjustCaretDimensions(caret, isSiblingBeforeBreakflowParent);
  }
}

function isElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function getCaretIntoView() {
  const caret = getCaretElement();
  if (!caret || isElementInViewport(caret)) {
    return;
  }

  caret.scrollIntoView({ block: "center", inline: "nearest" });
}

onMounted(() => {
  handleCaretAdjustmentOnMount();
  getCaretIntoView();
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
    min-width: 2rem;
    width: 100%;
  }

  &[writing-mode="horizontal"]::after {
    width: 2px;
    min-height: 2rem;
    height: 100%;
  }
}
</style>
