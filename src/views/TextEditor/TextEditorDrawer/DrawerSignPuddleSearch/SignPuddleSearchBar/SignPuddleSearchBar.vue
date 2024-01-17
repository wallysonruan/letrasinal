<script setup lang="ts">
import { ref } from "vue";

type SignPuddleSearchBarProps = {
  onSearch: (input: string) => void;
  rules?: Array<(v: string) => boolean | string>;
};
const props = defineProps<SignPuddleSearchBarProps>();
const input = ref("");
</script>
<template>
  <div>
    <v-text-field
      v-model="input"
      label="Sinal"
      variant="solo"
      type="search"
      class="input-sign"
      :rules="rules"
      clearable
      @keydown.enter="props.onSearch(input)"
      @click:append-inner="props.onSearch(input)"
      append-inner-icon="mdi-magnify"
    />
  </div>
</template>
<style scoped lang="scss">
.input-sign {
  margin-bottom: 0.5rem;
}
</style>
