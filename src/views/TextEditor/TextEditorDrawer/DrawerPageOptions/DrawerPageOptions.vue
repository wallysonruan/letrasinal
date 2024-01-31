<script setup lang="ts">
import pageStore from "@/stores/PageStore";
</script>
<template>
  <div>
    <h2 class="drawer-page-title">Configurações da Página</h2>
    <v-card variant="flat">
      <v-card-text> Orientação da Página </v-card-text>
      <v-card-actions>
        <v-btn @click="pageStore().changePageOrientation('portrait')">
          Retrato
        </v-btn>
        <v-btn @click="pageStore().changePageOrientation('landscape')"
          >Paisagem</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<style scoped lang="scss">
.drawer-page-title {
  font-size: 1rem;
  margin-bottom: 1rem;
}
</style>
