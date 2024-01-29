<script setup lang="ts">
import { ref } from "vue";
import DrawerSignPuddleSearch from "./DrawerSignPuddleSearch/DrawerSignPuddleSearch.vue";
// import DrawerSignPuddleTranslate from "./DrawerSignPuddleTranslate/DrawerSignPuddleTranslate.vue";

const tab = ref("");
</script>
<template>
  <div>
    <h2 class="drawer-signpuddle-title">SignPuddle</h2>
    <v-tabs v-model="tab">
      <v-tab value="search">Pesquisar</v-tab>
      <v-tab value="translate" disabled>Traduzir</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="search">
        <DrawerSignPuddleSearch />
      </v-window-item>
      <!-- <v-window-item value="translate">
        <DrawerSignPuddleTranslate />
      </v-window-item> -->
    </v-window>
  </div>
</template>
<style scoped lang="scss">
.drawer-signpuddle-title {
  font-size: 1rem;
}
</style>
