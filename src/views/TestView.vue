<script setup lang="ts">
import HeaderBar from "@/components/HeaderBar/HeaderBar.vue";
import PageSheet from "@/components/Page/PageSheet.vue";
</script>
<template>
  <div class="home-container">
    <HeaderBar />
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
  }
}
</style>
