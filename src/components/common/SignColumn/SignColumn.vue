<template>
  <div class="sign-column-container">
    <div class="sign-column-item" style="grid-column: 2">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.sign-column-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
