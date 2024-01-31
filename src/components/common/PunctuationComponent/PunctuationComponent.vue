<script setup lang="ts">
import { computed } from "vue";
import type { PunctuationDetails } from "../../../stores/PageStore";
import pageStore from "../../../stores/PageStore";

type PunctuationComponentProps = {
  pageId: number;
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

  const error = new Error(
    `PunctuationComponent: Unknown punctuation type "${props.type.type}".`,
  );
  throw error;
});

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(props.pageId).writingMode;
});

const showPunctuation = computed(() => {
  return pageStore().shouldShowSpaces();
});
</script>
<template>
  <div
    :class="`punctuation ${punctuationClass}`"
    :writing-mode="writingMode"
    :show="showPunctuation"
  ></div>
</template>
<style scoped lang="scss">
.punctuation {
  position: relative;

  &[show="true"] {
    background-color: rgb(208, 200, 200, 0.3);
    border: 2px dashed rgb(163, 160, 160, 0.3);
  }

  &[writing-mode="vertical"] {
    &[show="true"] {
      min-width: 3rem;
    }

    &.space {
      height: 1rem;
    }

    &.long-space {
      height: 2rem;
    }
  }

  &[writing-mode="horizontal"] {
    &[show="true"] {
      min-height: 3rem;
    }

    &.space {
      width: 1rem;
    }

    &.long-space {
      width: 2rem;
    }
  }
}
</style>
