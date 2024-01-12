<script setup lang="ts">
import { isValidFswString } from "@/utils/SignWritingUtilities";
import LatinAlphabet from "../LatinAlphabet/LatinAlphabet.vue";
import SignWriting from "../common/SignWriting/SignWriting.vue";

const props = defineProps<{
  word: string;
}>();

const isSignWriting = isValidFswString(props.word.split(" ")[0]);
</script>
<template>
  <div>
    <template v-if="isSignWriting">
      <SignWriting
        v-for="(word, index) in props.word.split(' ')"
        :key="index"
        :fsw="word"
      ></SignWriting>
    </template>
    <LatinAlphabet v-else :word="word" />
  </div>
</template>
