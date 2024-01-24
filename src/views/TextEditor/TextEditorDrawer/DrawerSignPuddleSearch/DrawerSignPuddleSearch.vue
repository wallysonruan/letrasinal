<script setup lang="ts">
import { getSignsByWord } from "../../../../utils/client/client";
import { ref } from "vue";
import { computed } from "vue";

import type { PageItemType } from "../../../../stores/PageStore";
import pageStore from "../../../../stores/PageStore";
import SignDisplayGrid from "../../../../components/common/SignDisplayGrid/SignDisplayGrid.vue";
import SignPuddleSearchForm from "./SignPuddleSearchForm/SignPuddleSearchForm.vue";
import type { SignPuddleFormRequest } from "./SignPuddleSearchForm/SignPuddleSearchForm.vue";

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

function filterOutSignsWithDifferentAuthor(
  payload: SignPuddlePayload,
  author: string,
): SignPuddleResult[] {
  const results = payload.results;
  return results.filter((result) => result.source.includes(author));
}

const signsFromSignPuddle = ref<SignPuddleResult[]>([]);

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

const isLoading = ref(false);
function loadingOn() {
  isLoading.value = true;
}
function loadingOff() {
  isLoading.value = false;
}

async function handleSearch(input: SignPuddleFormRequest) {
  signsFromSignPuddle.value = [];
  loadingOn();
  await getSignsByWord(input.word, input.match).then((res: unknown) => {
    let payload = res as SignPuddlePayload;

    if (input.source.length > 0) {
      payload.results = filterOutSignsWithDifferentAuthor(
        payload,
        input.source,
      );
    }

    signsFromSignPuddle.value.push(...filterOutSignsWithoutFsw(payload));
  });
  loadingOff();
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
  // await getSignsByWord();
  done(InfiniteScrollLoadStatus.NO_MORE_CONTENT);
}
</script>
<template>
  <v-sheet class="mx-auto spuddle-search-container">
    <SignPuddleSearchForm @on-search="handleSearch" />
    <div class="search-list-container">
      <div class="search-list-result">
        <v-progress-circular
          indeterminate
          v-if="isLoading"
          class="loading-circular"
        />
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
              icon="fa-refresh"
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
            <!-- <v-alert type="info">Paginação não implementada.</v-alert> -->
          </template>
        </v-infinite-scroll>
      </div>
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

  .search-list-result {
    position: relative;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    min-height: 20rem;
    max-height: 20rem;
    margin: 0%;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
    overflow: auto;

    .loading-circular {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .infinite-scroller {
      width: 100%;
      overflow: unset;
    }
  }
  .buttons-container {
    display: flex;
    justify-content: right;
  }
}

@media screen and (max-width: 600px) {
  // No need for a design for mobile devices - for now.
  // .spuddle-search-container {
  //   .search-list-result {
  //     min-height: 5rem;
  //     max-height: min-content;
  //   }
  // }
}
</style>
