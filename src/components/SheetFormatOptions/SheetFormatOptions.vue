<script setup lang="ts">
import e_pageOrientation from "./PageOrientationEvent";

function pageOrientation(e: Event) {
  e.target?.dispatchEvent(e_pageOrientation);
}
</script>
<template>
  <div class="page-orientation-container no-printable">
    <v-btn icon>
      <v-icon @click="pageOrientation">
        <img
          width="30"
          src="../../assets/page-orientation-icon.svg"
          alt="Page orientation"
        />
      </v-icon>
    </v-btn>
  </div>
</template>
