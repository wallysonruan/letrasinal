<script setup lang="ts">
import SortableList from "@/components/SortableList/SortableList.vue";
import DraggableItem from "@/components/DraggableItem/DraggableItem.vue";

import { ref } from "vue";
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";
import { computed } from "vue";
import SignPuddleSearch from "@/components/SignPuddleSearch/SignPuddleSearch.vue"

import signPuddleSearchStore from "@/stores/SignPuddleStore";

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

const signPuddleSearch = signPuddleSearchStore();
</script>
<template>
  <div>
    <v-text-field
      v-model="input"
      @keydown.enter="handleEvent"
      label="Palavra, frase ou FSW"
    >
      <template #append>
        <button
          @click="signPuddleSearch.toggleSignPuddleSearch"
          class="signpuddle-btn"
        >
          SignPuddle
        </button>
      </template>
    </v-text-field>
    <div class="list">
      <SortableList>
        <DraggableItem v-for="(word, index) in separatedText" :key="index">
          <AlphabetDisplay :word="word" />
        </DraggableItem>
      </SortableList>
    </div>
    <SignPuddleSearch
      :selected="inputed"
      :show="signPuddleSearch.isSignPuddleSearchActive()"
    />
  </div>
</template>
<style scoped lang="scss">
.list {
  height: 30rem;
  resize: vertical;
  overflow: auto;
}

.signpuddle-btn {
  margin-right: 2.5rem;
}
</style>
