<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";
import { getSignsByWord } from "@/utils/client/client";
import { ref } from "vue";

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

function handleSubmit() {
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

function handleOk() {
  props.selectedSigns(selected.value);
  selected.value.forEach(() => {
    selected.value.pop();
  });
  signPuddleSearch.toggleSignPuddleSearch();
}

const rules = [(v: string) => v.length >= 2 || "Escreva ao menos de 2 letras"];

const input = ref("");
const items = ref<SignPuddleResult[]>([]);
const signPuddleSearch = signPuddleSearchStore();
const selected = ref<string[]>([]);
function addSelected(sign: string) {
  selected.value.push(sign);
}
</script>
<template>
  <div class="overlay" v-if="props.show">
    <v-sheet class="mx-auto parent-container">
      <v-form @submit.prevent class="form-container" @submit="handleSubmit">
        <v-text-field
          v-model="input"
          label="Sinal"
          variant="solo"
          type="search"
          class="input"
          :rules="rules"
        >
          <template #append>
            <v-btn
              type="submit"
              block
              class="mt-2 submit-button"
              append-icon="mdi-search"
              icon
              :disabled="input.length < 2"
            />
          </template>
        </v-text-field>
      </v-form>
      <!-- <v-infinite-scroll mode="manual" height="400" @load="load"> -->
      <ul class="list-results">
        <template v-for="(item, index) in items" :key="index">
          <li class="result">
            <input
            class="checkbox"
              type="checkbox"
              :id="`result-${index}`"
              @input="addSelected(signOrSignText(item))"
            />
            <label class="checkbox-label" :for="`result-${index}`">
              <AlphabetDisplay :word="signOrSignText(item)" />
            </label>
          </li>
        </template>
      </ul>
      <!-- </v-infinite-scroll> -->
      <div class="buttons">
        <v-btn
          class="mt-2"
          color="rgba(0,0,0,0.5)"
          width="40%"
          @click="signPuddleSearch.toggleSignPuddleSearch"
        >
          Fechar
        </v-btn>
        <v-btn
          class="mt-2"
          color="rgba(0,0,0,0.5)"
          width="40%"
          @click="handleOk"
          :disabled="input.length < 2"
        >
          Ok
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>
<style scoped lang="scss">
.overlay {
  background-color: rgb(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
}
.parent-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 4rem;
  width: 80%;
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
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 1rem;
  margin: 0 0 1rem 0;
  .result {
    width: 25%;
    display: grid;
    place-content: center;

    .checkbox {
      display: none;

      &:checked + .checkbox-label {
        border: 1px solid green;
      }
    }
  }
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: 600px) {
  .list-results {
    .result {
      width: 50%;
    }
  }
}
</style>
