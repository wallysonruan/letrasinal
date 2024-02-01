<script setup lang="ts">
import { ref } from "vue";
import pageStore from "../../../../../stores/PageStore";
import type {
  SignDetails,
  SignPunctuationDetails,
} from "../../../../../stores/PageStore";

const fswToBeExported = ref<string[]>([]);
const hasFswToBeShown = ref(false);

function handleExport() {
  fswToBeExported.value = [];

  const totalPages = pageStore().getTotalPages();
  let pagesText = [];

  for (let i = 0; i < totalPages; i++) {
    const pageText = pageStore().getPageText(i);
    pagesText.push(pageText);
  }

  pagesText.forEach((pageText) => {
    let fsw = "";
    pageText?.forEach((text) => {
      const textDetails = text.details;
      let signFsw = (textDetails as SignDetails).fsw;

      if (text.type === "caret") {
        return;
      }

      if (text.type === "signPunctuation") {
        signFsw = (textDetails as SignPunctuationDetails).fsw.vertical;
      }

      fsw = fsw.concat(" " + signFsw).trim();
    });

    if (fsw.length <= 0) {
      return;
    }

    hasFswToBeShown.value = true;
    fswToBeExported.value.push(fsw);
  });
}
</script>
<template>
  <div class="fsw-export-container">
    <h2 class="fsw-title">Exportar FSW</h2>
    <!--  -->
    <div class="fsw-actions">
      <v-btn type="submit" color="primary" width="50%" @click="handleExport">
        Gerar FSW
      </v-btn>
    </div>
    <div class="fsw-export-results">
      <div class="no-fsw-to-show" v-show="!hasFswToBeShown">
        <p>Não há FSW para mostrar, escreva algo primeiro.</p>
      </div>
      <div
        class="export-results"
        v-for="(fsw, index) in fswToBeExported"
        :key="index"
      >
        <h3 class="export-results-title">Page #{{ index + 1 }}:</h3>
        <v-textarea readonly :value="fsw" variant="outlined" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.fsw-export-container {
  padding-top: 0.5rem;

  .fsw-title {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }

  .fsw-actions {
    display: flex;
    justify-content: right;
    margin-top: 0.3rem;
  }

  .fsw-export-results {
    .no-fsw-to-show {
      margin: 1rem 0;
      color: gray;
    }
  }
  .export-results {
    .export-results-title {
      font-size: 1rem;
    }
  }
}
</style>
