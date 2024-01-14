<script setup lang="ts">
import PageSheet from "@/components/Sheet/Page/SheetPage.vue";
import ToolBar from "@/components/ToolBar/ToolBar.vue";
import SignPuddleSearch from "@/components/Sheet/SignPuddleSearch/SignPuddleSearch.vue";
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
    <SignPuddleSearch />
  </div>
</template>
<style scoped lang="scss">
.home-container {
  background-color: rgb(128, 128, 128, 0.06);
  padding-bottom: 1.5rem;

  .sheets {
    display: flex;
    justify-content: center;
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
