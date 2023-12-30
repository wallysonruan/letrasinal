<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";
import { getSignsByWord } from "@/utils/client/client";
import { ref } from "vue";

import SelectableItem from "../SelectableItem/SelectableItem.vue";

import signPuddleSearchStore from "@/stores/SignPuddleStore";
import { computed } from "vue";

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

function processPayload(payload: SignPuddlePayload): SignPuddleResult[] {
  const results = payload.results;
  return results.filter(
    // (result) => result.sign.length > 0 || result.signtext.length > 0,
    (result) => result.sign.length > 0,
  );
}

async function getSigns() {
  await getSignsByWord(input.value).then((res: unknown) => {
    const payload = res as SignPuddlePayload;
    signsFromSignPuddle.value.push(...processPayload(payload));
  });
}

function signOrSignText(result: SignPuddleResult): string {
  // if (result.sign != null && result.sign.length > 0) {
  return result.sign;
  // } else {
  //   return result.signtext;
  // }
}

async function handleSearch() {
  signsFromSignPuddle.value = [];
  await getSigns();
}

function removeAllResultsNodes() {
  const list = document.querySelector(".list-results");
  if (list == null) {
    return;
  }
  list.innerHTML = "";
}

function clearSearchDialog() {
  input.value = "";
  signsFromSignPuddle.value = [];
  selected.value = [];
  removeAllResultsNodes();
}

function handleClose() {
  clearSearchDialog();
  signPuddleSearch.toggleSignPuddleSearch();
}

function handleOk() {
  props.selectedSigns(selected.value);
  clearSearchDialog();
  signPuddleSearch.toggleSignPuddleSearch();
}

const signPuddleSearch = signPuddleSearchStore();

const input = ref("");
const rules = [(v: string) => v.length >= 2 || "Escreva ao menos 2 letras!"];

function removeSignsWithDuplicateFswSign(signs: Array<SignPuddleResult>) {
  let seen = new Set();
  return signs.filter((sign) => {
    let duplicate = seen.has(sign.sign);
    seen.add(sign.sign);
    return !duplicate;
  });
}

const signsFromSignPuddle = ref<SignPuddleResult[]>([]);
const filteredSigns = computed(() =>
  removeSignsWithDuplicateFswSign(signsFromSignPuddle.value),
);
const showDialog = computed(() => signPuddleSearch.isSignPuddleSearchActive());
const selected = ref<string[]>([]);
</script>
<template>
  <v-dialog v-model="showDialog">
    <v-sheet class="mx-auto spuddle-search-container">
      <div>
        <v-text-field
          v-model="input"
          label="Sinal"
          variant="solo"
          type="search"
          class="input-sign"
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
        <template v-for="(sign, index) in filteredSigns" :key="index">
          <li class="result">
            <SelectableItem :value="signOrSignText(sign)" v-model="selected">
              <AlphabetDisplay :word="signOrSignText(sign)" />
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
          @click="handleClose"
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
.spuddle-search-container {
  min-width: 4rem;
  width: 90%;
  max-width: 35rem;
  padding: 1.5rem;
  border-radius: 0.5rem;

  .input-sign {
    margin-bottom: 0.5rem;
  }
  .list-results {
    height: 20rem;
    padding: 1rem;
    margin: 0%;
    overflow: auto;
    //
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    list-style-type: none;
    //
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 0.5rem;
    row-gap: 0.5rem;
  }
  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (max-width: 600px) {
  .list-results {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
