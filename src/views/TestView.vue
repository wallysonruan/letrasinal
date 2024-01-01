<script setup lang="ts">
import SortableList from "@/components/SortableList/SortableList.vue";
import DraggableItem from "@/components/DraggableItem/DraggableItem.vue";

import { ref } from "vue";
import AlphabetDisplay from "@/components/AlphabetDisplay/AlphabetDisplay.vue";
import { computed } from "vue";
import SignPuddleSearch from "@/components/SignPuddleSearch/SignPuddleSearch.vue";
import PageSheet from "@/components/Page/PageSheet.vue";

import signPuddleSearchStore from "@/stores/SignPuddleStore";
import ToolBar from "@/components/ToolBar/ToolBar.vue";

const inputed = ref<string[]>([]);
const separatedText = computed(() =>
  inputed.value.filter((text) => text.trim() != ""),
);

function setInputed(text: string) {
  inputed.value.push(text);
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
    <ToolBar> </ToolBar>
    <div class="sheets">
      <PageSheet>
        <SortableList>
          <DraggableItem v-for="(word, index) in separatedText" :key="index">
            <AlphabetDisplay :word="word" />
          </DraggableItem>
        </SortableList>
      </PageSheet>
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
  max-width: max-content;

  .sheets {
    display: grid;
    place-content: center;
  }
}
</style>
