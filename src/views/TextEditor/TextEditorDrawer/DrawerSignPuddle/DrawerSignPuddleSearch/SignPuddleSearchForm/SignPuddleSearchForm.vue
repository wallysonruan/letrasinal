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
import { SignPuddleMatch } from "@/api/SignPuddle";
import { ref } from "vue";

const matchOptions = [
  {
    title: "Qualquer lugar",
    value: "any",
  },
  {
    title: "Início",
    value: "start",
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

function disableSearch(): boolean {
  return (
    request.value.word.trim().length === 0 &&
    request.value.text.trim().length === 0 &&
    request.value.source.trim().length === 0
  );
}
</script>
<template>
  <div class="search-container">
    <form @submit.prevent class="search-container-bar">
      <v-text-field
        label="Palavra"
        variant="outlined"
        hide-details
        v-model="request.word"
      />
      <!-- clearable -->
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
        hide-details
        class="mb-2"
        v-model="request.text"
      />
      <!-- clearable -->
      <v-text-field
        label="Autor (a)"
        variant="outlined"
        hide-details
        class="mb-2"
        v-model="request.source"
      />
      <!-- clearable -->
      <label for="sourceMandatory">
        <input
          id="sourceMandatory"
          type="checkbox"
          v-model="request.sourceOnly"
        />
        Mostrar apenas sinais que tenham autores registrados.
      </label>
      <div class="search-actions">
        <v-btn
          type="submit"
          color="primary"
          @click="handleSearch"
          class="mt-2 mb-2"
          :disabled="disableSearch()"
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
