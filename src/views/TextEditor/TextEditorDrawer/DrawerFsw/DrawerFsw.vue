<script setup lang="ts">
import { ref } from "vue";
import FswImport from "./FswImport/FswImport.vue";
import FswExport from "./FswExport/FswExport.vue";

const tab = ref("");
</script>
<template>
  <div>
    <h2 class="drawer-fsw-title">Formal SignWriting</h2>
    <v-tabs v-model="tab">
      <v-tab value="import">Importar</v-tab>
      <v-tab value="export">Exportar</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="import">
        <FswImport />
      </v-window-item>
      <!--  -->
      <v-window-item value="export">
        <FswExport />
      </v-window-item>
    </v-window>
  </div>
</template>
<style scoped lang="scss">
.drawer-fsw-title {
  font-size: 1rem;
}
</style>
