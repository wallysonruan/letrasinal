<template>
  <div class="printable">
    <v-sheet width="794" height="1123" class="sheet">
      <slot></slot>
    </v-sheet>
  </div>
</template>
<style scoped lang="scss">
.sheet {
  border: 1px solid rgb(0, 0, 0, 0.2);

  &:hover {
    cursor: text;
  }
}
</style>
