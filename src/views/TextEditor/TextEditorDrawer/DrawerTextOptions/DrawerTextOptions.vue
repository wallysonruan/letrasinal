<script setup lang="ts">
import pageStore from "@/stores/PageStore";
</script>
<template>
  <div>
    <h2 class="drawer-text-title">Configurações do Texto</h2>
    <v-card variant="flat">
      <v-card-text> Orientação do Texto </v-card-text>
      <v-card-actions>
        <v-btn @click="pageStore().setWritingMode(1, 'vertical')">
          Vertical
        </v-btn>
        <v-btn @click="pageStore().setWritingMode(1, 'horizontal')">
          Horizontal</v-btn
        >
      </v-card-actions>
    </v-card>
    <!--  -->
    <v-card variant="flat">
      <v-card-text> Colunas </v-card-text>
      <v-card-actions>
        <v-btn @click="pageStore().toggleColumns(true)"> Mostrar </v-btn>
        <v-btn @click="pageStore().toggleColumns(false)"> Esconder</v-btn>
      </v-card-actions>
    </v-card>
    <!--  -->
    <v-card variant="flat">
      <v-card-text> Quebra de Fluxo </v-card-text>
      <v-card-actions>
        <v-btn @click="pageStore().toggleBreakflow(true)"> Mostrar </v-btn>
        <v-btn @click="pageStore().toggleBreakflow(false)"> Esconder</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<style scoped lang="scss">
.drawer-text-title {
  font-size: 1rem;
}
</style>
