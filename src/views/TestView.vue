<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay.vue";
import { getSignsByWord } from "@/utils/client/client";
import { ref } from "vue";
import type { SubmitEventPromise } from "vuetify";

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

async function getSigns() {
  await getSignsByWord(sign.value).then((res: unknown) => {
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
  if (result.sign != null && result.sign.length > 0) {
    return result.sign;
  } else {
    return result.signtext;
  }
}

function handleSubmit(e: SubmitEventPromise) {
  items.value = []; // Clear the items array
  getSigns();
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
  await getSigns();
  done("ok");
}

const sign = ref("");
const items = ref<SignPuddleResult[]>([]);
</script>
<template>
  <v-sheet class="mx-auto parent-container">
    <v-form @submit.prevent class="form-container" @submit="handleSubmit">
      <v-text-field
        v-model="sign"
        label="Sinal"
        variant="solo"
        type="search"
        hide-details
        class="input"
      >
        <template #append>
          <v-btn
            type="submit"
            block
            class="mt-2 submit-button"
            append-icon="mdi-plus"
          >
            Pesquisar
          </v-btn>
        </template>
      </v-text-field>
    </v-form>
    <v-infinite-scroll mode="manual" height="400" @load="load">
      <ul class="list-results">
        <template v-for="(item, index) in items" :key="index">
          <li class="results">
            <AlphabetDisplay :word="signOrSignText(item)" />
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
    </v-infinite-scroll>
  </v-sheet>
</template>
<style scoped lang="scss">
.parent-container {
  min-width: 4rem;
  max-width: 35rem;
}
.form-container {
  display: flex;
  flex-direction: row;
}
.list-results {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
  .results {
    width: max-content;
  }
}
</style>
