<script setup lang="ts">
import LogoItem from "../Logo/LogoItem.vue";
import signPuddleSearchStore from "@/stores/SignPuddleStore";

import e_pageOrientation from "./PageOrientationEvent";

function print() {
  window.print();
}

function pageOrientation(e: Event) {
  e.target?.dispatchEvent(e_pageOrientation);
}
</script>
<template>
  <div class="toolbar-container no-printable">
    <v-toolbar class="toolbar" density="comfortable">
      <v-toolbar-title>
        <LogoItem />
      </v-toolbar-title>
      <v-btn icon>
        <v-icon @click="pageOrientation">
          <img
            width="30"
            src="../../assets/page-orientation-icon.svg"
            alt="Page orientation"
          />
        </v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon @click="signPuddleSearchStore().toggleSignPuddleSearch">
          <img
            width="25"
            src="../../assets/sign-puddle-icon.png"
            alt="SignPuddle"
          />
        </v-icon>
      </v-btn>
      <v-btn icon @click="print">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>
<style scoped lang="scss">
.toolbar-container {
  .toolbar {
    background-color: rgb(193, 185, 185);
    opacity: 1;
    width: 90%;
    border-radius: 1.5rem;
    margin: 1rem auto;
  }
}
</style>
