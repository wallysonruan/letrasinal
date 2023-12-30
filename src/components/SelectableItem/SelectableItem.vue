<script setup lang="ts">
const props = defineProps<{
  value: string;
}>();
</script>
<template>
  <v-checkbox :value="props.value" hide-details>
    <template #label>
      <slot></slot>
    </template>
  </v-checkbox>
</template>
<style scoped lang="scss"></style>
