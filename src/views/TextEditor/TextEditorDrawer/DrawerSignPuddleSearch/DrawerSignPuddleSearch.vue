<script setup lang="ts">
import { getSignsByWord } from "../../../../utils/client/client";
import { ref } from "vue";
import { computed } from "vue";

import type { PageItemType } from "../../../../stores/PageStore";
import pageStore from "../../../../stores/PageStore";
import SignDisplayGrid from "../../../../components/common/SignDisplayGrid/SignDisplayGrid.vue";
import SignPuddleSearchBar from "./SignPuddleSearchBar/SignPuddleSearchBar.vue";

enum InfiniteScrollLoadStatus {
  CONTENT_ADDED_SUCCESSFULLY = "ok",
  LOADING = "loading",
  NO_MORE_CONTENT = "empty",
  ERROR = "error",
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

function filterOutSignsWithoutFsw(
  payload: SignPuddlePayload,
): SignPuddleResult[] {
  const results = payload.results;
  return results.filter((result) => result.sign.length > 0);
}

const signsFromSignPuddle = ref<SignPuddleResult[]>([]);

async function getSigns(input: string) {
  await getSignsByWord(input).then((res: unknown) => {
    const payload = res as SignPuddlePayload;
    signsFromSignPuddle.value.push(...filterOutSignsWithoutFsw(payload));
  });
}

function removeSignsWithDuplicateFswSign(signs: Array<SignPuddleResult>) {
  let seen = new Set();
  return signs.filter((sign) => {
    let duplicate = seen.has(sign.sign);
    seen.add(sign.sign);
    return !duplicate;
  });
}

function convertSignPuddleResultToPageItem(
  result: SignPuddleResult,
): PageItemType {
  return pageStore().createSignPageItem("sign", result.sign, result.terms);
}

const signPuddleResultAsPageItem = computed(() => {
  const filteredSigns: SignPuddleResult[] = removeSignsWithDuplicateFswSign(
    signsFromSignPuddle.value,
  );
  let signs: PageItemType[] = [];

  filteredSigns.forEach((sign) => {
    signs.push(convertSignPuddleResultToPageItem(sign));
  });

  return signs;
});

function removeAllResultsNodes() {
  const list = document.querySelector(".list-results");
  if (list == null) {
    return;
  }
  list.innerHTML = "";
}

const selected = ref<string[]>([]);

function getSelected(selectedSigns: string[]) {
  selected.value = selectedSigns;
}

function clearSearchDialog() {
  signsFromSignPuddle.value = [];
  selected.value = [];
  removeAllResultsNodes();
}

async function handleSearch(input: string) {
  signsFromSignPuddle.value = [];
  await getSigns(input);
}

function handleOk() {
  selected.value.forEach((selection) => {
    const pageItem = signPuddleResultAsPageItem.value.find(
      (item) => item.id === selection,
    );
    pageStore().addPageItem(pageItem!!);
  });

  clearSearchDialog();
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
</script>
<template>
  <v-sheet class="mx-auto spuddle-search-container">
    <SignPuddleSearchBar :onSearch="handleSearch"></SignPuddleSearchBar>
    <div class="search-list">
      <v-infinite-scroll
        v-if="signsFromSignPuddle.length > 0"
        @load="load"
        class="infinite-scroller"
      >
        <SignDisplayGrid
          :signs="signPuddleResultAsPageItem"
          @onSelect="getSelected"
        ></SignDisplayGrid>
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
  }
  .buttons-container {
    display: flex;
    justify-content: right;
  }
}
</style>
