<script setup lang="ts">
import { computed } from "vue";
import type { PunctuationDetails } from "../../../stores/PageStore";
import pageStore from "../../../stores/PageStore";
import { onMounted } from "vue";

type PunctuationComponentProps = {
  type: PunctuationDetails;
};

const props = defineProps<PunctuationComponentProps>();

const punctuationClass = computed(() => {
  if (props.type.type === "space") {
    return "space";
  }

  if (props.type.type === "long-space") {
    return "long-space";
  }

  if (props.type.type === "break") {
    return "break";
  }

  const error = new Error(
    `PunctuationComponent: Unknown punctuation type "${props.type.type}".`,
  );
  throw error;
});

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(1).writingMode;
});

onMounted(() => {
  // gets page-content height
  const pageContent = document.querySelector(".page-content");
  console.log("pageContent", pageContent);
  const pageContentHeight = (pageContent as HTMLElement).clientHeight;
  console.log("pageContent.clientHeight", pageContentHeight);

  // gets punctuation inside page-content, and returns the distance it is from the top of the page-content
  const punctuation = document.querySelector(".punctuation");
  console.log("punctuation", punctuation);
  const punctuationTop = (punctuation as HTMLElement).offsetTop;
  console.log("punctuation.offsetTop", punctuationTop);
});
</script>
<template>
  <div
    :class="`punctuation ${punctuationClass}`"
    :writing-mode="writingMode"
  ></div>
</template>
<style scoped lang="scss">
.punctuation {
  &[writing-mode="vertical"] {
    &.space {
      height: 1rem;
    }

    &.long-space {
      height: 2rem;
    }
  }

  &[writing-mode="horizontal"] {
    &.space {
      width: 1rem;
    }

    &.long-space {
      width: 2rem;
    }
  }
}
</style>
