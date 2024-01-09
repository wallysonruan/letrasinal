<script setup lang="ts">
import e_pageOrientation from "./PageOrientationEvent";
import e_pageMargin from "./PageMarginEvent";

function pageOrientation(e: Event) {
  e.target?.dispatchEvent(e_pageOrientation);
}

function pageMargin(e: Event) {
  e.target?.dispatchEvent(e_pageMargin);
}
</script>
<template>
  <div class="no-printable">
    <v-btn icon @click="pageMargin" disabled>
      <v-icon>
        <img
          width="25"
          src="../../assets/page-margin-icon.png"
          alt="Text margin"
        />
      </v-icon>
    </v-btn>
    <v-btn icon @click="pageOrientation">
      <v-icon>
        <img
          width="30"
          src="../../assets/page-orientation-icon.svg"
          alt="Page orientation"
        />
      </v-icon>
    </v-btn>
  </div>
</template>
