<script setup lang="ts">
import { ref } from "vue";

type SignPuddleSearchBarProps = {
  onSearch: (input: string) => void;
  rules?: Array<(v: string) => boolean | string>;
};
const props = defineProps<SignPuddleSearchBarProps>();
const input = ref("");

const defaultRules = [
  (v: string) => v.length !== 0 || "Campo obrigatório",
  ...(props.rules ?? []),
];

const valid = ref(true);

function checkRulesAndSearch() {
  valid.value = defaultRules.every((rule) => rule(input.value) === true);
  if (valid.value) {
    props.onSearch(input.value);
  }
}
</script>
<template>
  <div>
    <v-text-field
      v-model="input"
      label="Sinal"
      variant="solo"
      type="search"
      class="input-sign"
      :rules="defaultRules"
      clearable
      @keydown.enter="checkRulesAndSearch"
      @click:append-inner="checkRulesAndSearch"
      append-inner-icon="mdi-magnify"
    />
  </div>
</template>
<style scoped lang="scss">
.input-sign {
  margin-bottom: 0.5rem;
}
</style>
