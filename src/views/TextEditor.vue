<script setup lang="ts">
import PageSheet from "@/components/Page/PageSheet.vue";
import ToolBar from "@/components/ToolBar/ToolBar.vue";
import SignPuddleSearch from "@/components/SignPuddleSearch/SignPuddleSearchV2.vue";

import signPuddleSearchStore from "@/stores/SignPuddleStore";
import { type PageItemType } from "@/components/PageItem/PageItem.vue";

const items: PageItemType[] = [
  {
    id: "askldjas",
    type: "sign",
    details: {
      fsw: "M521x520S36d00479x480S37900478x480S20500465x508S20311466x488",
      words: ["oi", "OI"],
    },
  },
];
</script>
<template>
  <div class="home-container">
    <div class="sticky no-printable">
      <ToolBar />
    </div>
    <div class="sheets">
      <PageSheet :text="items" />
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
