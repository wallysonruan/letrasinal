<script setup lang="ts">
import { computed } from "vue";
import type { PunctuationDetails } from "../../../stores/PageStore";
import pageStore from "../../../stores/PageStore";

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

  const error = new Error(
    `PunctuationComponent: Unknown punctuation type "${props.type.type}".`,
  );
  throw error;
});

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(1).writingMode;
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
  position: relative;

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
