<script lang="ts">
export type SignPuddleFormRequest = {
  word: string;
  match: SignPuddleMatch;
  text: string;
  source: string;
  sourceOnly: boolean;
};
</script>
<script setup lang="ts">
import { SignPuddleMatch } from "@/utils/client/client";
import { ref } from "vue";

const matchOptions = [
  {
    title: "Início",
    value: "start",
  },
  {
    title: "Qualquer lugar",
    value: "any",
  },
  {
    title: "Final",
    value: "end",
  },
  {
    title: "Exatamente",
    value: "exact",
  },
];

const request = ref<SignPuddleFormRequest>({
  word: "",
  match: SignPuddleMatch.Anywhere,
  text: "",
  source: "",
  sourceOnly: false,
});

const emit = defineEmits<{
  (event: "onSearch", request: SignPuddleFormRequest): void;
}>();

function handleSearch() {
  emit("onSearch", request.value);
}

function disableIfWordIsEmpty(): boolean {
  return !request.value.word || request.value.word.trim().length < 1;
}
</script>
<template>
  <div class="search-container">
    <form @submit.prevent class="search-container-bar">
      <v-text-field
        label="Palavra"
        variant="outlined"
        clearable
        hide-details
        v-model="request.word"
      />
      <v-chip-group
        mandatory
        filter
        v-model="request.match"
        class="mb-2"
        column
      >
        <v-chip
          v-for="(option, index) in matchOptions"
          :key="index"
          :value="option.value"
        >
          {{ option.title }}
        </v-chip>
      </v-chip-group>
      <v-text-field
        label="Texto"
        variant="outlined"
        clearable
        hide-details
        class="mb-2"
        v-model="request.text"
        disabled
      />
      <v-text-field
        label="Autor (a)"
        variant="outlined"
        clearable
        hide-details
        class="mb-2"
        v-model="request.source"
        :disabled="disableIfWordIsEmpty()"
      />
      <label for="sourceMandatory">
        <input
          id="sourceMandatory"
          type="checkbox"
          v-model="request.sourceOnly"
        />
        Mostrar apenas sinais que tenham autores definidos.
      </label>
      <div class="search-actions">
        <v-btn
          type="submit"
          color="primary"
          @click="handleSearch"
          class="mt-2 mb-2"
          :disabled="disableIfWordIsEmpty()"
          >Pesquisar</v-btn
        >
      </div>
    </form>
  </div>
</template>
<style scoped lang="scss">
.search-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
