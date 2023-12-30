<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  value: string;
}>();

type Style = {
  border?: `${number}px solid ${string}`;
};

const style = ref<Style>({});

function toggleStyle() {
  if (style.value.border) {
    style.value = {};
    return;
  }
  style.value = {
    border: "2px solid green",
  };
}
</script>
<template>
  <v-checkbox
    :value="props.value"
    hide-details
    class="selectable-item-container"
    @change="toggleStyle"
    :style="style"
  >
    <template #label>
      <slot></slot>
    </template>
  </v-checkbox>
</template>
<style scoped lang="scss">
.selectable-item-container {
  width: 100%;
  height: 100%;
  padding: 0.3rem;
  border: 1px solid rgb(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  //
  display: grid;
  place-items: center;
}

</style>
<style lang="scss">
// Overrode the default style of v-checkbox-btn
.v-checkbox-btn {
  .v-selection-control__wrapper {
    display: none;
  }
}
</style>
