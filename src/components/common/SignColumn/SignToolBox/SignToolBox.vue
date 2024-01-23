<script setup lang="ts">
import { computed, ref } from "vue";
import pageStore, { type ColumnTypes } from "../../../../stores/PageStore";
import pageItemStore from "@/stores/PageItemStore";
import type { StyleValue } from "vue";

type SignToolBoxProps = {
  itemId: string;
  active: boolean;
  column: ColumnTypes;
};

const props = defineProps<SignToolBoxProps>();
const emit = defineEmits(["closeToolbox"]);

const formatting = ref<number[]>([]);
const pageItemColumn = ref<number>(0);

function setPageItemColumn() {
  switch (props.column) {
    case "left":
      pageItemColumn.value = 0;
      break;
    case "middle":
      pageItemColumn.value = 1;
      break;
    case "right":
      pageItemColumn.value = 2;
      break;
  }
}

setPageItemColumn();

function dinamicallyPositionToolBox(): StyleValue {
  const toolboxHeight = 55; // Size of toolbox + margin space, in pixels
  const toolboxWidth = 310; // Size of toolbox + margin space, in pixels

  const isNearTopBorder = pageItemStore().isPageItemNearTopBorder(
    props.itemId,
    toolboxHeight,
  );

  const isNearRightBorder = pageItemStore().isPageItemNearRightBorder(
    props.itemId,
    toolboxWidth,
  );

  if (isNearTopBorder && isNearRightBorder) {
    return {
      bottom: `-${toolboxHeight}px`,
      left: `-${310}px`,
    };
  }

  if (isNearTopBorder) {
    return {
      bottom: `-${toolboxHeight}px`,
    };
  }

  return {
    top: `-${toolboxHeight}px`,
  };
}

function toggleToolbox() {
  emit("closeToolbox");
}

const pageItemFontSize = computed(() => {
  return pageStore().getPageItemFontSize(props.itemId);
});
</script>
<template>
  <div
    v-if="props.active"
    class="toolbox-container"
    :style="dinamicallyPositionToolBox()"
  >
    <div class="toolbox">
      <v-btn-toggle v-model="formatting" multiple variant="outlined" divided>
        <v-btn
          style="background-color: white"
          @click="pageStore().decreaseFontSize(props.itemId)"
          :disabled="(pageItemFontSize ?? 1) <= 0.7"
        >
          <v-icon icon="fa-minus"></v-icon>
        </v-btn>

        <v-btn
          style="background-color: white"
          @click="pageStore().increaseFontSize(props.itemId)"
        >
          <v-icon icon="fa-plus"></v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle v-model="pageItemColumn" variant="outlined" divided>
        <v-btn
          style="background-color: white"
          @click="pageStore().changePageItemColumn(props.itemId, 'left')"
        >
          <v-icon icon="fa-align-left"></v-icon>
        </v-btn>

        <v-btn
          style="background-color: white"
          @click="pageStore().changePageItemColumn(props.itemId, 'middle')"
        >
          <v-icon icon="fa-align-center"></v-icon>
        </v-btn>

        <v-btn
          style="background-color: white"
          @click="pageStore().changePageItemColumn(props.itemId, 'right')"
        >
          <v-icon icon="fa-align-right"></v-icon>
        </v-btn>
      </v-btn-toggle>

      <v-btn-toggle variant="outlined" divided>
        <v-btn
          style="background-color: #a91b0d; color: white"
          @click="toggleToolbox"
        >
          <v-icon icon="fa-close"> </v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>
<style scoped lang="scss">
.toolbox-container {
  position: absolute;
  width: max-content;
  z-index: 1;
}
</style>
