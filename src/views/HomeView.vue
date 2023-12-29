<script setup lang="ts">
import SortableList from "@/components/SortableList/SortableList.vue";
import DraggableItem from "@/components/DraggableItem/DraggableItem.vue";

import { ref } from "vue";
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";
import { computed } from "vue";

const input = ref("");
const inputed = ref([""]);
const separatedText = computed(() =>
  inputed.value.filter((text) => text.trim() != ""),
);

function clearInput() {
  input.value = "";
}

function setInputed(text: string) {
  inputed.value.push(text);
}

function handleEvent(event: Event) {
  if ((event as KeyboardEvent).key != "Enter" && event.type != "click") {
    return;
  }
  setInputed(input.value);
  clearInput();
}
</script>
<template>
  <div>
    <v-text-field v-model="input" @keydown.enter="handleEvent" />
    <div class="list">
      <SortableList>
        <DraggableItem v-for="(word, index) in separatedText" :key="index">
          <AlphabetDisplay :word="word" />
        </DraggableItem>
      </SortableList>
    </div>
  </div>
</template>
<style scoped lang="scss">
.list {
  height: 30rem;
  resize: vertical;
  overflow: auto;
}
</style>
