<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
<style lang="scss">
a {
  text-decoration: none;
  color: inherit;

  &:visited {
    color: inherit;
  }
}
</style>
