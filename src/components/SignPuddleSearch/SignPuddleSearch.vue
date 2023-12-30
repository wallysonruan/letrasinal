<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";
import { getSignsByWord } from "@/utils/client/client";
import { ref } from "vue";

import SelectableItem from "../SelectableItem/SelectableItem.vue";

import signPuddleSearchStore from "@/stores/SignPuddleStore";

type SignPuddleResult = {
  created_at: string;
  detail: Array<string>;
  id: string;
  sign: string;
  signtext: string;
  source: string;
  terms: Array<string>;
  text: string;
  updated_at: string;
  user: string;
};

type SignPuddlePayload = {
  meta: {
    limit: number;
    location: string;
    offset: number;
    searchTime: string;
    totalResults: number;
  };
  results: SignPuddleResult[];
};

type SignPuddleSearchProps = {
  show: boolean;
  selectedSigns: (selected: string[]) => void;
};

const props = defineProps<SignPuddleSearchProps>();

async function getSigns() {
  await getSignsByWord(input.value).then((res: unknown) => {
    const payload = res as SignPuddlePayload;
    items.value.push(...processPayload(payload));
    console.log(items);
  });
}

function processPayload(payload: SignPuddlePayload): SignPuddleResult[] {
  const results = payload.results;
  return results.filter(
    (result) => result.sign.length > 0 || result.signtext.length > 0,
  );
}

function signOrSignText(result: SignPuddleResult): string {
  // if (result.sign != null && result.sign.length > 0) {
  return result.sign;
  // } else {
  //   return result.signtext;
  // }
}

async function handleSearch() {
  items.value = []; // Clear the items array
  await getSigns();
}

/* 
There's a typing error with this "done", unfortunatlly there's no way to type it correctly because I have no access to the required types.
  Required types:

type load: ((options: {
    side: InfiniteScrollSide;
    done: (status: InfiniteScrollStatus) => void;
}) => any)
*/
// @ts-ignore
// async function load({ done }) {
//   await getSigns();
//   done("ok");
// }

function handleOk() {
  props.selectedSigns(selected.value);

  selected.value = [];

  signPuddleSearch.toggleSignPuddleSearch();
}

const rules = [(v: string) => v.length >= 2 || "Escreva ao menos 2 letras!"];

const input = ref("");
const items = ref<SignPuddleResult[]>([]);
const signPuddleSearch = signPuddleSearchStore();
const selected = ref<string[]>([]);
</script>
<template>
  <v-dialog v-model="props.show">
    <v-sheet class="mx-auto parent-container">
      <div>
        <v-text-field
          v-model="input"
          label="Sinal"
          variant="solo"
          type="search"
          class="input"
          :rules="rules"
          @keydown.enter="handleSearch"
        >
          <template #append>
            <v-btn
              type="search"
              block
              class="mt-2 submit-button"
              icon
              :disabled="input.length < 2"
              @click="handleSearch"
            >
              <i class="bi bi-search"></i>
            </v-btn>
          </template>
        </v-text-field>
      </div>
      <!-- <v-infinite-scroll mode="manual" height="400" @load="load"> -->
      <ul class="list-results">
        <template v-for="(item, index) in items" :key="index">
          <li class="result">
            <SelectableItem :value="signOrSignText(item)" v-model="selected">
              <AlphabetDisplay :word="signOrSignText(item)" />
            </SelectableItem>
          </li>
        </template>
      </ul>
      <!-- </v-infinite-scroll> -->
      <div class="buttons-container">
        <v-btn
          class="mt-2"
          width="40%"
          color="rgba(192, 63, 63, 1)"
          @click="signPuddleSearch.toggleSignPuddleSearch"
        >
          Fechar
        </v-btn>
        <v-btn
          class="mt-2"
          color="rgb(39, 103, 39, 1)"
          width="40%"
          @click="handleOk"
          :disabled="selected.length < 1"
        >
          Adicionar
        </v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</template>
<style scoped lang="scss">
.parent-container {
  min-width: 4rem;
  width: 90%;
  max-width: 35rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
}
.form-container {
  display: flex;
  flex-direction: row;
}
.list-results {
  height: 20rem;
  padding: 1rem;
  margin: 0 0 1rem 0;
  list-style-type: none;
  overflow: auto;
  //
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  .result {
    height: min-content;
    display: grid;
    place-content: center;
  }
}
.buttons-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: 600px) {
  .list-results {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
