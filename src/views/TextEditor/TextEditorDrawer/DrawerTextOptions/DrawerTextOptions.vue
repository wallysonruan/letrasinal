<script setup lang="ts">
import pageStore from "@/stores/PageStore";
</script>
<template>
  <div>
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
  </div>
</template>
