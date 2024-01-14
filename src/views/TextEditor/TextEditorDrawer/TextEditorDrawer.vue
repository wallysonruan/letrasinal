<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

import DrawerPageOptions from "./DrawerPageOptions/DrawerPageOptions.vue";
import DrawerSignPuddleSearch from "./DrawerSignPuddleSearch/DrawerSignPuddleSearch.vue";
import LogoItem from "@/components/common/Logo/LogoItem.vue";

const drawer = ref(true);
const rail = ref(true);
const closeAllOnDrawerClose = computed(() => {
  return rail.value === true ? "display: none;" : "display: block;";
});
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
    width="320"
  >
    <v-list-item>
      <template v-slot:append>
        <v-btn
          variant="text"
          :icon="chevronDirection"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
      <LogoItem />
    </v-list-item>

    <v-list density="compact" nav>
      <v-list-group value="pagina">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-file"
            title="Configurações da Página"
          ></v-list-item>
        </template>
        <div :style="closeAllOnDrawerClose">
          <DrawerPageOptions />
        </div>
      </v-list-group>

      <v-divider></v-divider>

      <v-list-group value="sinal">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-hand"
            title="Adicionar Sinais"
          ></v-list-item>
        </template>

        <div :style="closeAllOnDrawerClose">
          <v-list-group value="signpuddle">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="SignPuddle">
                <template v-slot:prepend>
                  <v-icon>
                    <img
                      class="sp-btn"
                      width="25"
                      src="../../../assets/sign-puddle-icon.png"
                      alt="SignPuddle"
                    />
                  </v-icon>
                </template>
              </v-list-item>
            </template>
            <DrawerSignPuddleSearch />
          </v-list-group>

          <v-list-group value="fsw">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Formal SignWriting" disabled>
                <template v-slot:prepend>
                  <div :style="'margin-right: 1.5rem;'">FSW</div>
                </template>
              </v-list-item>
            </template>
          </v-list-group>
        </div>
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
        <div :style="closeAllOnDrawerClose"></div>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped lang="scss"></style>
