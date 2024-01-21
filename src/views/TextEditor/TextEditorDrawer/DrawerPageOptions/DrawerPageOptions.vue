<script setup lang="ts">
import pageStore from "@/stores/PageStore";
</script>
<template>
  <div>
    <v-card variant="flat">
      <v-card-text> Orientação da Página </v-card-text>
      <v-card-actions>
        <v-btn @click="pageStore().changePageOrientation(1, 'portrait')">
          Retrato
        </v-btn>
        <v-btn @click="pageStore().changePageOrientation(1, 'landscape')"
          >Paisagem</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
