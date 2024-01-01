<script setup lang="ts">
import Logo from "@/components/Logo/LogoItem.vue";
</script>
<template>
  <v-toolbar density="compact" class="no-printable header-bar">
    <v-toolbar-title>
      <Logo />
    </v-toolbar-title>
  </v-toolbar>
</template>
<style scoped lang="scss">
.header-bar {
  margin-bottom: 1rem;
}
</style>
