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

function stringHasSpaceOnly(str: string) {
  return str.trim().length === 0;
}
</script>
<template>
  <div class="search-container">
    <div class="search-container-bar">
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
        disabled
      />
      <!-- <label for="sourceMandatory">
        <input
          id="sourceMandatory"
          type="checkbox"
          v-model="request.sourceOnly"
        />
        Mostrar apenas sinais que tenham autores definidos.
      </label> -->
    </div>
    <div class="search-actions">
      <v-btn
        color="primary"
        @click="handleSearch"
        class="mt-2 mb-2"
        :disabled="request.word.length < 1"
        >Pesquisar</v-btn
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
.search-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
