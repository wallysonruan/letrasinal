<script setup lang="ts">
import SortableList from "@/components/SortableList/SortableList.vue";
import DraggableItem from "@/components/DraggableItem/DraggableItem.vue";

import { ref } from "vue";
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";
import { computed } from "vue";
import SignPuddleSearch from "@/components/SignPuddleSearch/SignPuddleSearch.vue";

import signPuddleSearchStore from "@/stores/SignPuddleStore";

const input = ref<string>();
const inputed = ref<string[]>([]);
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

  if(input.value?.trim() == "") {
    return;
  }

  setInputed(input.value as string);
  clearInput();
}

function getSelectedFromSignPuddleSearch(selected: string[]) {
  selected.forEach((text) => {
    setInputed(text);
  });
}

const signPuddleSearch = signPuddleSearchStore();
</script>
<template>
  <div class="home-container">
    <v-text-field
      v-model="input"
      @keydown.enter="handleEvent"
      label="Palavra, frase ou FSW"
      variant="solo"
    >
      <template #append>
        <v-btn
          @click="signPuddleSearch.toggleSignPuddleSearch"
          class="signpuddle-btn"
          icon
        >
          <img src="@/assets/sign-puddle-icon.png" alt="SignPuddle" />
        </v-btn>
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
      :selected-signs="getSelectedFromSignPuddleSearch"
      :show="signPuddleSearch.isSignPuddleSearchActive()"
    />
  </div>
</template>
<style scoped lang="scss">
.home-container {
  padding: 1.5rem;
}
.list {
  height: 40rem;
  resize: vertical;
  overflow: auto;
}

.signpuddle-btn {
  position: relative;
  // margin-right: 2.5rem;
  border: black;

  img {
    width: 2rem;
  }
}
</style>
