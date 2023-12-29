<script setup lang="ts">
import { isValidFswString } from "@/utils/SignWritingUtilities";
import LatinAlphabet from "./LatinAlphabet.vue";
import SignWriting from "./SignWriting/SignWriting.vue";

const props = defineProps<{
  word: string;
}>();

const isSignWriting = isValidFswString(props.word.split(" ")[0]);
const isSentence = props.word.split(" ").length > 1;
</script>
<template>
  <div :sentence="isSentence">
    <div v-if="isSignWriting">
      <SignWriting
        v-for="(word, index) in props.word.split(' ')"
        :key="index"
        :fsw="word"
      />
    </div>
    <LatinAlphabet v-else :word="word" />
  </div>
</template>
<style scoped lang="scss">
div[sentence="true"] {
  resize: both;
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
