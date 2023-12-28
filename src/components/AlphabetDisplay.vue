<script setup lang="ts">
import { re } from "@sutton-signwriting/core/fsw";
import LatinAlphabet from "./LatinAlphabet.vue";
import SignWriting from "./SignWriting/SignWriting.vue";

/**
 * REGEX:
 * - ^A?([BLMR][0-9]{3}x[0-9]{3})?(S[123][0-9a-f]{2}[0-5][0-9a-f]([BLMR])?[0-9]{3}x[0-9]{3})+$
 *
 * The regex expression will look for the caracteristics below:
 *
 * - It must have the exact pattern declared in the regex;
 *    - REGEX: ^[...]$
 *
 * - It must either have a re.sort at the beginning or not;
 *    - REGEX: A? [...]
 *
 * - It must either have a re.box and a re.coord at the beginning or after the re.sort;
 *    - REGEX: [...] ([BLMR][0-9]{3}x[0-9]{3})? [...]
 *
 * - It must have multiple recurrences of the pattern inside the parenthesis;
 *    - REGEX: ([...])+
 *
 * -  It must have either a re.symbol and a re.coord with a re.box between them or not;
 *    - REGEX: [...] S[123][0-9a-f]{2}[0-5][0-9a-f]([BLMR])?[0-9]{3}x[0-9]{3} [...]
 *
 * @param fsw - A string to be tested against a regex that will say if it's a valid fsw or not.
 */
function isValidFswString(fsw: string): boolean {
  const fsw_regex_string = `^${re.sort}?(${re.box}${re.coord})?(${re.symbol}(${re.box})?${re.coord})+$`;
  const fsw_regex = new RegExp(fsw_regex_string);
  return fsw_regex.test(fsw);
}

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
