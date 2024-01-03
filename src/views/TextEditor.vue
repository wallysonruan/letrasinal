<script setup lang="ts">
import PageSheet from "@/components/Page/PageSheet.vue";
import ToolBar from "@/components/ToolBar/ToolBar.vue";
import SignPuddleSearch from "@/components/SignPuddleSearch/SignPuddleSearch.vue";

import signPuddleSearchStore from "@/stores/SignPuddleStore";
</script>
<template>
  <div class="home-container">
    <div class="sticky no-printable">
      <ToolBar />
    </div>
    <div class="sheets">
      <PageSheet />
    </div>
    <SignPuddleSearch
      :selected-signs="() => {}"
      :show="signPuddleSearchStore().isSignPuddleSearchActive()"
    />
  </div>
</template>
<style scoped lang="scss">
.home-container {
  background-color: rgb(128, 128, 128, 0.06);
  padding-bottom: 1.5rem;

  .sticky {
    position: sticky;
    top: 10px;
    z-index: 1;
  }

  .sheets {
    display: grid;
    place-content: center;
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
