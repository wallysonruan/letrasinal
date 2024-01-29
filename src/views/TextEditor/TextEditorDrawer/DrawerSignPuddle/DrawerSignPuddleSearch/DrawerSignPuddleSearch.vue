<script setup lang="ts">
import type {
  SignPuddleSignEndPointResult,
  SignPuddleSearchEndPointResult,
} from "@/api/SignPuddle";
import {
  getSignsByTerm,
  SignPuddleMatch,
  getSignsByText,
  getSignsBySource,
} from "@/api/SignPuddle";
import { ref } from "vue";

import type { PageItemType } from "../../../../../stores/PageStore";
import pageStore from "../../../../../stores/PageStore";
import SignDisplayGrid from "../../../../../components/common/SignDisplayGrid/SignDisplayGrid.vue";
import SignPuddleSearchForm from "./SignPuddleSearchForm/SignPuddleSearchForm.vue";
import type { SignPuddleFormRequest } from "./SignPuddleSearchForm/SignPuddleSearchForm.vue";
import SignWriting from "@/components/common/SignWriting/SignWriting.vue";

const signsFromApi = ref<Partial<SignPuddleSearchEndPointResult>[]>([]);
const totalSigns = ref(0);
async function getSignsFromApi(
  kind: "term" | "text" | "source",
  term: string,
  match: SignPuddleMatch,
) {
  if (kind === "term") {
    const payload = await getSignsByTerm(term, match);
    totalSigns.value = payload.meta.totalResults;
    signsFromApi.value.push(...payload.results);
  }

  if (kind === "text") {
    const payload = await getSignsByText(term, match);
    totalSigns.value = payload.meta.totalResults;
    signsFromApi.value.push(...payload.results);
  }

  if (kind === "source") {
    const payload = await getSignsBySource(term, match);
    totalSigns.value = payload.meta.totalResults;
    signsFromApi.value.push(...payload.results);
  }
}

const signsToShow = ref<Partial<SignPuddleSearchEndPointResult>[]>([]);

function filterSigns(
  payload: Partial<SignPuddleSearchEndPointResult>[],
  term: string,
  source: string,
  sourceOnly: boolean,
) {
  let results = payload;

  if (results[0].sign) {
    console.debug("[filterSigns] Removing duplicates");
    results = removeSignsWithDuplicateFswSign(results);
  }

  if (term.length > 0) {
    console.debug("[filterSigns] Filtering by term");
    results = results.filter((result) =>
      result.terms!.some((termInArray) =>
        termInArray.toLowerCase().includes(term.toLowerCase()),
      ),
    );
  }

  if (
    (payload as SignPuddleSearchEndPointResult[])[0].source &&
    source.length > 0
  ) {
    console.debug("[filterSigns] Filtering by source");
    results = filterOutSignsWithDifferentAuthor(
      results as SignPuddleSearchEndPointResult[],
      source,
    );
  }

  if ((payload as SignPuddleSearchEndPointResult[])[0].source && sourceOnly) {
    console.debug("[filterSigns] Filtering by source only");
    results = filterOutSignsWithoutAnyAuthor(
      results as SignPuddleSearchEndPointResult[],
    );
  }

  signsToShow.value = results;
  console.debug(results);
}

function removeSignsWithDuplicateFswSign(
  signs: Partial<SignPuddleSearchEndPointResult>[],
) {
  let seen = new Set();
  return signs.filter((sign) => {
    let duplicate = seen.has(sign.sign);
    seen.add(sign.sign);
    return !duplicate;
  });
}

function filterOutSignsWithDifferentAuthor(
  results: SignPuddleSearchEndPointResult[],
  author: string,
): SignPuddleSearchEndPointResult[] {
  return results.filter((result) => result.source.includes(author));
}

function filterOutSignsWithoutAnyAuthor(
  results: SignPuddleSearchEndPointResult[],
): SignPuddleSearchEndPointResult[] {
  return results.filter((result) => result.source.length > 0);
}

function filterOutSignsWithSigntext(
  signs: Partial<SignPuddleSearchEndPointResult>[],
) {
  return signs.filter((sign) => sign.sign!.length > 0);
}

const selected = ref<string[]>([]);
function getSelected(selectedSigns: string[]) {
  selected.value = selectedSigns;
}

const isLoading = ref(false);

async function handleSearch(input: SignPuddleFormRequest) {
  signsFromApi.value = [];
  isLoading.value = true;

  if (input.word.length > 0) {
    await getSignsFromApi("term", input.word, input.match);
  }

  if (input.source.length > 0) {
    await getSignsFromApi("source", input.source, input.match);
  }

  if (input.text.length > 0) {
    await getSignsFromApi("text", input.text, input.match);
  }

  filterSigns(signsFromApi.value, input.word, input.source, input.sourceOnly);

  isLoading.value = false;
}

function convertSignPuddleResultToPageItem(
  result: Partial<SignPuddleSearchEndPointResult>,
): PageItemType {
  let terms = [""];

  if ((result as SignPuddleSearchEndPointResult).terms) {
    terms = (result as SignPuddleSearchEndPointResult).terms;
  }

  return pageStore().createSignPageItem("sign", result.sign!, terms);
}

function handleOk() {
  selected.value.forEach((selection) => {
    const selectedItem = signsToShow.value.find(
      (sign) => sign.id === selection,
    );
    const pageItem = convertSignPuddleResultToPageItem(selectedItem!);
    pageStore().addPageItem(pageItem);
  });

  selected.value = [];
  signsToShow.value = [];
  signsFromApi.value = [];
}
</script>
<template>
  <v-sheet class="mx-auto spuddle-search-container">
    <SignPuddleSearchForm @on-search="handleSearch" />
    <format @submit.prevent class="search-list-container">
      <div class="search-list-result">
        <SignWriting
          v-if="signsToShow.length === 0 && !isLoading"
          fsw="M543x532S34100481x483S17610527x495S17618453x495S36e00477x520S30a30488x491"
          :font-size="2"
          color="rgb(200,200,200)"
          class="centralize"
        />
        <v-progress-circular
          indeterminate
          v-if="isLoading"
          class="centralize"
        />
        <SignDisplayGrid
          v-if="signsToShow.length > 0"
          :signs="signsToShow as SignPuddleSearchEndPointResult[]"
          @onSelect="getSelected"
        ></SignDisplayGrid>
      </div>
      <div class="buttons-container">
        <v-btn
          type="submit"
          color="rgb(39, 103, 39, 1)"
          width="50%"
          :disabled="selected.length < 1"
          @click="handleOk"
        >
          Adicionar
        </v-btn>
      </div>
    </format>
  </v-sheet>
</template>
<style scoped lang="scss">
.spuddle-search-container {
  min-width: 4rem;
  padding: 0.5rem 0;

  .search-list-result {
    position: relative;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    min-height: 7rem;
    max-height: 10rem;
    margin: 0%;
    margin-bottom: 1rem;
    padding: 0.5rem 0.5rem;
    overflow: auto;

    .centralize {
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
    height: 7rem;
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
