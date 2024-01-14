<script setup lang="ts">
import { getSignsByWord } from "../../../../utils/client/client";
import { ref } from "vue";
import { computed } from "vue";

import SelectableItem from "../../../../components/common/SelectableItem/SelectableItem.vue";

import type { PageItemType } from "../../../../stores/PageStore";
import pageStore from "../../../../stores/PageStore";
import SignWriting from "../../../../components/common/SignWriting/SignWriting.vue";

enum InfiniteScrollLoadStatus {
  CONTENT_ADDED_SUCCESSFULLY = "ok",
  LOADING = "loading",
  NO_MORE_CONTENT = "empty",
  ERROR = "error",
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
async function load({ done }) {
  // await getSigns();
  done(InfiniteScrollLoadStatus.NO_MORE_CONTENT);
}

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

function processPayload(payload: SignPuddlePayload): SignPuddleResult[] {
  const results = payload.results;
  return results.filter((result) => result.sign.length > 0);
}

async function getSigns() {
  await getSignsByWord(input.value).then((res: unknown) => {
    const payload = res as SignPuddlePayload;
    signsFromSignPuddle.value.push(...processPayload(payload));
  });
}

function findResultById(
  id: string,
  results: SignPuddleResult[],
): SignPuddleResult {
  return results.find((result) => {
    return result.id === id;
  })!;
}

function returnPageItem(result: SignPuddleResult): PageItemType {
  return pageStore().createSignPageItem("sign", result.sign, result.terms);
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

function handleOk() {
  selected.value.forEach((selection) => {
    pageStore().addPageItem(
      returnPageItem(findResultById(selection, filteredSigns.value)),
    );
  });

  clearSearchDialog();
}

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

const selected = ref<string[]>([]);
</script>
<template>
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
        append-inner-icon="mdi-magnify"
        @click:append-inner="handleSearch"
      >
      </v-text-field>
    </div>
    <div class="search-list">
      <v-infinite-scroll
        v-if="signsFromSignPuddle.length > 0"
        @load="load"
        class="infinite-scroller"
      >
        <ul class="search-results">
          <template v-for="(sign, index) in filteredSigns" :key="index">
            <li class="result">
              <SelectableItem :value="sign.id" v-model="selected">
                <SignWriting :fsw="sign.sign"></SignWriting>
              </SelectableItem>
            </li>
          </template>
        </ul>
        <template v-slot:load-more="{ props }">
          <v-btn
            icon="mdi-refresh"
            variant="text"
            size="small"
            v-bind="props"
          ></v-btn>
        </template>
        <template v-slot:error="{ props }">
          <v-alert type="error">
            <div class="d-flex justify-space-between align-center">
              Algo deu errado.
              <v-btn
                color="white"
                variant="outlined"
                size="small"
                v-bind="props"
              >
                Tentar outra vez
              </v-btn>
            </div>
          </v-alert>
        </template>
        <template v-slot:empty>
          <!-- <v-alert type="warning">Não há mais sinais.</v-alert> -->
          <v-alert type="info">Paginação não implementada.</v-alert>
        </template>
      </v-infinite-scroll>
    </div>
    <div class="buttons-container">
      <v-btn
        color="rgb(39, 103, 39, 1)"
        width="50%"
        @click="handleOk"
        :disabled="selected.length < 1"
      >
        Adicionar
      </v-btn>
    </div>
  </v-sheet>
</template>
<style scoped lang="scss">
.spuddle-search-container {
  min-width: 4rem;
  width: 90%;
  max-width: 35rem;
  padding: 0.5rem 0;

  .input-sign {
    margin-bottom: 0.5rem;
  }

  .search-list {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    min-height: 10rem;
    max-height: 20rem;
    margin: 0%;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
    overflow: auto;

    .infinite-scroller {
      overflow: unset;
    }

    .search-results {
      list-style-type: none;
      //
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 0.5rem;
      row-gap: 0.5rem;
    }
  }
  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

@media only screen and (max-width: 600px) {
  .spuddle-search-container {
    .search-list {
      .search-results {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}
</style>
