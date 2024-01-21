<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

import DrawerPageOptions from "./DrawerPageOptions/DrawerPageOptions.vue";
import DrawerTextOptions from "./DrawerTextOptions/DrawerTextOptions.vue";
import DrawerSignPuddleSearch from "./DrawerSignPuddleSearch/DrawerSignPuddleSearch.vue";
import LogoItem from "@/components/common/Logo/LogoItem.vue";
import browserWindowStore from "@/stores/BrowserWindowStore";

const drawer = ref(true);
const drawerExpandable = ref(true);
const windowWidth = computed(() => {
  return browserWindowStore().windowWidth;
});
const drawerLocation = computed(() => {
  if (windowWidth.value < 600) {
    return "bottom";
  }

  return "left";
});

const closeAllOnDrawerClose = computed(() => {
  // if the drawer is not expandable, then we don't need to close anything
  return drawerExpandable.value === true ? "display: none;" : "display: block;";
});

const chevronDirection = computed(() => {
  if (drawerLocation.value === "left") {
    return drawerExpandable.value ? "mdi-chevron-right" : "mdi-chevron-left";
  }

  if (drawerLocation.value === "bottom") {
    return drawerExpandable.value ? "mdi-chevron-up" : "mdi-chevron-down";
  }
});

const disablePageOptions = computed(() => {
  return browserWindowStore().windowWidth < 600;
});
</script>
<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="drawerExpandable"
    permanent
    @click="drawerExpandable = false"
    width="320"
    :location="drawerLocation"
  >
    <v-list-item>
      <template v-slot:append>
        <v-btn
          variant="text"
          :icon="chevronDirection"
          @click.stop="drawerExpandable = !drawerExpandable"
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
            :disabled="disablePageOptions"
          ></v-list-item>
        </template>
        <div :style="closeAllOnDrawerClose">
          <DrawerPageOptions />
        </div>
      </v-list-group>

      <v-divider></v-divider>

      <v-list-group value="texto">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-hand"
            title="Configurações de Texto"
          ></v-list-item>
        </template>

        <div :style="closeAllOnDrawerClose">
          <v-list-group value="writing-mode">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Orientação do Texto">
                <template v-slot:prepend>
                  <v-icon>
                    <!--  -->
                  </v-icon>
                </template>
              </v-list-item>
            </template>
            <DrawerTextOptions />
          </v-list-group>
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
