<script setup lang="ts">
import SortableList from "@/components/SortableList.vue";
import DraggableItem from "@/components/DraggableItem.vue";

import { ref } from "vue";
import AlphabetDisplay from "@/components/AlphabetDisplay.vue";
import { computed } from "vue";

const input = ref("");
const separatedText = computed(() => splitText(input.value));

/*
 * This function will split the text into an array of words.
 * It will also ignore the spaces inside quotes.
 *
 * Example:
 *
 * Input: "Hello World" "How are you?" Good Well
 * Output: ["Hello World", "How are you?", "Good", "Well"]
 */
function splitText(text: string): string[] {
  // Regex explanation:
  // - "([^"]*)" - Matches anything inside quotes
  // - \S+ - Matches anything that is not a space
  // - | - Matches either the first or the second
  // - g - Global flag, will match all ocurrences
  const regex = /"([^"]*)"|\S+/g;
  let match;
  const result = [];
  while ((match = regex.exec(text)) !== null) {
    result.push(match[1] ? match[1] : match[0]);
  }
  return result;
}
</script>
<template>
  <div>
    <v-textarea clearable v-model="input" />
    <div class="list">
      <SortableList>
        <DraggableItem v-for="word in separatedText">
          <AlphabetDisplay :word="word" />
        </DraggableItem>
      </SortableList>
    </div>
  </div>
</template>
<style scoped lang="scss">
.list {
  height: 30rem;
  width: max-content;
}
</style>
