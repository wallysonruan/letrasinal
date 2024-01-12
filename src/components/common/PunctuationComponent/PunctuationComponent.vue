<script setup lang="ts">
import type { PunctuationDetails } from "../../../stores/PageStore";

type PunctuationComponentProps = {
  type: PunctuationDetails;
};

const props = defineProps<PunctuationComponentProps>();
function height() {
  console.log(props.type);
  if (props.type.type === "space") {
    return 1;
  }

  if (props.type.type === "long-space") {
    return 4;
  }
}
</script>
<template>
  <div class="punctuation" :style="`height:${height()}rem;`"></div>
</template>
