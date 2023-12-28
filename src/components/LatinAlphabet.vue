<script setup lang="ts">
const props = defineProps<{
  word: string;
}>();
</script>
<template>
  <div>
    <p>{{ props.word }}</p>
  </div>
</template>
<style scoped lang="scss">
p {
  word-break: break-all;
}
</style>
