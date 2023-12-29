<script setup lang="ts">
import AlphabetDisplay from "@/components/AlphabetDisplay.vue";
import { getSignsByWord } from "@/utils/client/client";
import { ref } from "vue";

type SignPuddlePayload = {
  meta: {
    limit: number;
    location: string;
    offset: number;
    searchTime: string;
    totalResults: number;
  },
  results: [
    {
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
    },
  ];
};

const items = ref<SignPuddlePayload[]>([]);

function handleEvent(event: Event) {
  if ((event as KeyboardEvent).key != "Enter" && event.type != "click") {
    return;
  }

  items.value = []; // Clear the items array

  getSignsByWord(input.value).then((res: unknown) => {
  const payload = res as SignPuddlePayload;
  console.log(payload.results.flatMap((result) => result));
  items.value.push(payload); // Add the payload to the items array
});
}

const input = ref("bola");

</script>
<template>
  <v-text-field v-model="input" @keydown.enter="handleEvent" />
  <div>
    <template v-for="(item, index) in items" :key="item">
        <ul class="infinite-scroll">
          <li v-for="(result, index) in item.results" :key="index">
            <AlphabetDisplay :word="result.sign" />
          </li>
        </ul>
    </template>
  </div>
</template>
<style scoped lang="scss">
.infinite-scroll {
  // height: 30rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 30rem;
  list-style: none;
  align-content: baseline;
}
</style>
