<script setup lang="ts">
import SortableList from "@/components/SortableList.vue";
import DraggableItem from "@/components/DraggableItem.vue";

import { ref } from "vue";
import AlphabetDisplay from "@/components/AlphabetDisplay.vue";
import { computed } from "vue";

const input = ref("");
const inputed = ref([""]);
const separatedText = computed(() => inputed.value.filter((text) => text.trim() != ""));
function clearInput() {
  input.value = "";
}

function setInputed(text: string) {
  inputed.value.push(text);
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    setInputed(input.value);
    clearInput();
  }
}

function handleAppendInner() {
  setInputed(input.value);
  clearInput();
}
</script>
<template>
  <div>
    <v-text-field
      v-model="input"
      @keydown.enter="handleKeyDown"
      @click:append-inner="handleAppendInner"
      append-inner-icon="mdi-plus"
    />
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
  resize: vertical;
  overflow: auto;
}
</style>
