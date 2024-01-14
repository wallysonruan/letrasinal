<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

import DrawerPageOptions from "./DrawerPageOptions/DrawerPageOptions.vue";

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

    <v-list density="compact" nav>
      <v-list-group value="pagina">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-file"
            title="Página"
          ></v-list-item>
        </template>

        <DrawerPageOptions />
      </v-list-group>

      <v-divider></v-divider>

      <v-list-group value="sinal">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-hand"
            title="Sinal"
          ></v-list-item>
        </template>
      </v-list-group>

      <v-divider></v-divider>

      <v-list-group value="imprimir">
        <template v-slot:activator="{ props }">
          <v-list-item
            disabled
            v-bind="props"
            prepend-icon="mdi-printer"
            title="Imprimir"
          ></v-list-item>
        </template>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped lang="scss"></style>
