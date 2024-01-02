<script setup lang="ts">
import Logo from "@/components/Logo/LogoItem.vue";
</script>
<template>
  <v-app-bar class="no-printable header-bar" density="compact">
    <v-app-bar-title>
      <Logo />
    </v-app-bar-title>
  </v-app-bar>
</template>
<style scoped lang="scss">
.header-bar {
  margin-bottom: 1rem;
}
</style>
