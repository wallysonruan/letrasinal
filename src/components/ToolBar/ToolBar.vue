<script setup lang="ts">
import { ref } from "vue";

import signPuddleSearchStore from "@/stores/SignPuddleStore";
import pageStore from "@/stores/PageStore";

const input = ref<string>();

function clearInput() {
  input.value = "";
}

function setInputed(text: string) {
  pageStore().addItem(text);
}

function handleEvent(event: Event) {
  if ((event as KeyboardEvent).key != "Enter" && event.type != "click") {
    return;
  }

  if (input.value?.trim() == "") {
    return;
  }

  setInputed(input.value as string);
  clearInput();
}

const signPuddleSearch = signPuddleSearchStore();
</script>
<template>
  <div class="toolbar-container">
    {{ pageStore().items }}
    <div class="toolbar">
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
    </div>
  </div>
</template>
<style scoped lang="scss">
.toolbar-container {
  .toolbar {
    .signpuddle-btn {
      img {
        width: 2rem;
      }
    }
  }
}
</style>
