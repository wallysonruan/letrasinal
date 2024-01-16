<script setup lang="ts">
import pageStore from "../../../../stores/PageStore";

type SignToolBoxProps = {
  itemId: string;
};

const props = defineProps<SignToolBoxProps>();
</script>
<template>
  <v-sheet class="toolbox-container" lines="one">
    <div class="toolbox">
      <v-btn
        class="btn left"
        variant="text"
        density="compact"
        block
        @click="pageStore().changePageItemColumn(props.itemId, 'left')"
        >E</v-btn
      >
      <v-btn
        class="btn middle"
        variant="text"
        density="compact"
        block
        @click="pageStore().changePageItemColumn(props.itemId, 'middle')"
        >M</v-btn
      >
      <v-btn
        class="btn right"
        variant="text"
        density="compact"
        block
        @click="pageStore().changePageItemColumn(props.itemId, 'right')"
        >D</v-btn
      >
    </div>
  </v-sheet>
</template>
<style scoped lang="scss">
.toolbox-container {
  background-color: blue;
  position: absolute;
  width: 100%;
  max-height: 2rem;
  top: -60%;
  border-radius: 0.5rem;

  .toolbox {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .btn {
    color: white;
    &.left {
      grid-column: 1;
    }

    &.middle {
      grid-column: 2;
    }

    &.right {
      grid-column: 3;
    }
  }
}
</style>
