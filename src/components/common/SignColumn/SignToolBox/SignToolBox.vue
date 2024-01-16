<script setup lang="ts">
import pageStore, { type PageItemTypes } from "../../../../stores/PageStore";

type SignToolBoxProps = {
  itemId: string;
  pageItemType: PageItemTypes;
  active: boolean;
};

const props = defineProps<SignToolBoxProps>();
const emit = defineEmits(["closeToolbox"]);

function styleTop(type: PageItemTypes) {
  switch (type) {
    case "signPunctuation":
      return "top: -170%;";
    case "number":
      return "top: -100%;";
    default:
      return "top: -60%;";
  }
}

function toggleToolbox() {
  emit("closeToolbox");
}
</script>
<template>
  <v-sheet
    v-if="props.active"
    class="toolbox-container"
    lines="one"
    :style="styleTop(props.pageItemType)"
  >
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
      <div class="btn close-container">
        <v-btn
          class="btn close"
          variant="text"
          density="compact"
          block
          @click="toggleToolbox"
        >
          X
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>
<style scoped lang="scss">
.toolbox-container {
  background-color: blue;
  position: absolute;
  width: 100%;
  max-height: 2rem;
  border-radius: 0.5rem;

  .toolbox {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

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

      &.close-container {
        position: absolute;
        top: -25px;
        right: 16px;
        width: 1rem;
        height: 1rem;

        .close {
          background-color: red;
        }
      }
    }
  }
}
</style>
