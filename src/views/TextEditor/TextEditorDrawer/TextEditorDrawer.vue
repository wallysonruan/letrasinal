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
  return browserWindowStore().getWindowWidth();
});

// const isMobile = computed(() => {
//   return windowWidth.value < 700;
// });

const drawerLocation = computed<"left" | "right" | "bottom">(() => {
  // Main user complained about the drawer being on the bottom of the screen.
  // So, for now, we'll keep it on the left side of the screen.
  // if (windowWidth.value < 600) {
  //   return "bottom";
  // }

  return "left";
});

const closeAllOnDrawerClose = computed(() => {
  // if the drawer is not expandable, then we don't need to close anything
  return drawerExpandable.value === true ? "display: none;" : "display: block;";
});

const chevronDirection = computed(() => {
  if (drawerLocation.value === "bottom") {
    return drawerExpandable.value ? "fa-chevron-up" : "fa-chevron-down";
  }
  return drawerExpandable.value ? "fa-chevron-right" : "fa-chevron-left";
});

const hidePageOptions = computed(() => {
  return windowWidth.value < 700;
});

// const eightyPercentHeight = computed(() => {
//   return browserWindowStore().getWindowHeightPercentage(85);
// });

const tab = ref("empty");
</script>
<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="drawerExpandable"
    permanent
    @click="drawerExpandable = false"
    width="300"
    :location="drawerLocation"
  >
    <div class="drawer-header">
      <LogoItem class="logo" v-if="!drawerExpandable" />
      <v-btn
        class="drawer-button"
        :closed="drawerExpandable"
        variant="text"
        :icon="chevronDirection"
        @click.stop="drawerExpandable = !drawerExpandable"
      ></v-btn>
    </div>

    <div class="drawer-features">
      <div class="tab-container">
        <!-- PAGE -->
        <button class="tab" @click="tab = 'page'" v-if="!hidePageOptions">
          <v-icon icon="fa-file-text" />
        </button>
        <!-- TEXT -->
        <button class="tab" @click="tab = 'text'">
          <v-icon icon="fa-hand" />
        </button>

        <!-- SIGNPUDDLE -->
        <button class="tab" @click="tab = 'signpuddle'">
          <i>
            <img
              class="sp-btn"
              width="25"
              src="../../../assets/sign-puddle-icon.png"
              alt="SignPuddle"
            />
          </i>
        </button>
      </div>

      <v-window
        v-model="tab"
        class="window-container"
        :style="closeAllOnDrawerClose"
        :closed="drawerExpandable"
      >
        <!-- PAGE -->
        <v-window-item value="page" v-if="!hidePageOptions">
          <DrawerPageOptions />
        </v-window-item>
        <!-- TEXT -->
        <v-window-item value="text">
          <DrawerTextOptions />
        </v-window-item>
        <!-- SIGNPUDDLE -->
        <v-window-item value="signpuddle">
          <DrawerSignPuddleSearch />
        </v-window-item>
      </v-window>
    </div>
  </v-navigation-drawer>
</template>
<style>
.v-navigation-drawer__content::-webkit-scrollbar {
  width: 0px;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px #424242;
  background-color: #424242;
}
</style>
<style scoped lang="scss">
.drawer-header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;

  .logo {
    margin-left: 1rem;
  }

  .drawer-button {
    &[closed="true"] {
      justify-self: center;
    }

    &[closed="false"] {
      justify-self: end;
    }
  }
}
.drawer-features {
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 0.5rem;

  .tab-container {
    width: 2rem;
    height: max-content;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-row-gap: 1rem;
    place-content: center;

    .tab {
    }
  }

  .window-container {
    width: 100%;
    height: 100%;
    padding-left: 0.5rem;

    &[closed="false"] {
      overflow: auto;
    }
  }
}
</style>
