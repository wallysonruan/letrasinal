<script setup lang="ts">
import PageSheet from "@/components/Page/PageSheet.vue";
// import ToolBar from "@/components/ToolBar/ToolBar.vue";
</script>
<template>
  <div class="home-container">
    <!-- <ToolBar /> -->
    <div class="sheets">
      <PageSheet />
    </div>
  </div>
</template>
<style scoped lang="scss">
.home-container {
  .sheets {
    display: grid;
    place-content: center;
    margin: 1.5rem 0;
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
