<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

const drawer = ref(true);
const rail = ref(false);
const chevronDirection = computed(() => {
  return rail.value ? "mdi-chevron-right" : "mdi-chevron-left";
});
</script>
<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item title="LetraSinal">
      <template v-slot:append>
        <v-btn
          variant="text"
          :icon="chevronDirection"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-file"
        title="Página"
        value="pagina"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-hand"
        title="Sinal"
        value="sinal"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-printer"
        title="Imprimir"
        value="imprimir"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped lang="scss"></style>
