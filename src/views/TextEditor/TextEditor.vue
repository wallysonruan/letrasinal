<script setup lang="ts">
import PageSheet from "@/components/Sheet/Page/SheetPage.vue";
import TextEditorDrawer from ".//TextEditorDrawer/TextEditorDrawer.vue";

import pageStore from "@/stores/PageStore";
import { computed } from "vue";

const pages = computed(() => pageStore().pages);
</script>
<template>
  <div class="text-editor-container">
    <div class="no-printable">
      <TextEditorDrawer />
    </div>
    <div class="sheets-container">
      <PageSheet
        v-for="(page, index) in pages"
        :key="index"
        :id="page.pageId"
        :text="page.text"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.text-editor-container {
  background-color: rgb(128, 128, 128, 0.06);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .sheets-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding-top: 1rem;
  }
}

@media print {
  .text-editor-container {
    padding: 0% !important;

    .sheets-container {
      margin: 0% !important;
    }
  }
}
</style>
