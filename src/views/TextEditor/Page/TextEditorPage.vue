<template>
  <div class="TextEditorPage">
    <div class="TextEditorPageContent">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.TextEditorPage {
  width: 790px;
  height: 1100px;
  padding: 10px;
  margin: auto;
  border-radius: 5px;

  .TextEditorPageContent {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;

    &:hover {
      cursor: text;
    }
  }
}

@media (prefers-color-scheme: dark) {
  .TextEditorPage {
    .TextEditorPageContent {
      background-color: rgb(155, 152, 152);
    }
  }
}
</style>
