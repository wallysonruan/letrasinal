<script setup lang="ts">
function print() {
  window.print();
}
</script>
<template>
  <div class="toolbar-container no-printable">
    <v-toolbar class="toolbar">
      <v-btn icon @click="print">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>
<style scoped lang="scss">
.toolbar-container {
  top: 0; // Sticky will only work with this, it's to keep the toolbar at the top of the page.
  position: sticky;

  .toolbar {
    width: 90%;
    height: 4rem;
    border-radius: 1.5rem;
    margin: 1rem auto;
  }
}
</style>
