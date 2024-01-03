<template>
  <div class="resizable">
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.resizable {
  border: 2px solid white;

  &:hover {
    border: 2px solid #0d99ff;
    border-radius: 0.3rem;
  }
}
</style>
