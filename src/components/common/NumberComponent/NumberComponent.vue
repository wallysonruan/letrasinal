<script setup lang="ts">
import type { NumberDetails } from "../../../stores/PageStore";

type NumberComponentProps = {
  number: NumberDetails;
};

const props = defineProps<NumberComponentProps>();
</script>
<template>
  <div class="number-component">
    <p>{{ props.number.number }}</p>
  </div>
</template>
