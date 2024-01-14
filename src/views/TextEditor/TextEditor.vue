<script setup lang="ts">
import PageSheet from "@/components/Sheet/Page/SheetPage.vue";
import TextEditorDrawer from ".//TextEditorDrawer/TextEditorDrawer.vue";

import pageStore from "@/stores/PageStore";
import { computed } from "vue";

const items = computed(() => pageStore().items);
</script>
<template>
  <div class="home-container">
    <div class="no-printable">
      <TextEditorDrawer />
    </div>
    <div class="sheets">
      <PageSheet :text="items" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.home-container {
  background-color: rgb(128, 128, 128, 0.06);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  .sheets {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

@media print {
  .home-container {
    padding: 0% !important;

    .sheets {
      margin: 0% !important;
    }
  }
}
</style>
