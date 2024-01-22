<script setup lang="ts">
import { ref } from "vue";
import pageStore from "../../../../stores/PageStore";

const formatting = ref<number[]>([]);
const alignment = ref<number>(1);

type SignToolBoxProps = {
  itemId: string;
  active: boolean;
};

const props = defineProps<SignToolBoxProps>();
const emit = defineEmits(["closeToolbox"]);

function styleTop() {
  return "top: -55px;";
}

function toggleToolbox() {
  emit("closeToolbox");
}
</script>
<template>
  <div v-if="props.active" class="toolbox-container" :style="styleTop()">
    <div class="toolbox">
      <v-btn
        class="close-btn"
        color="red"
        density="compact"
        icon
        @click="toggleToolbox"
      >
        <v-icon icon="mdi-close"> </v-icon>
      </v-btn>
      <!--  -->
      <v-btn-toggle v-model="formatting" multiple variant="outlined" divided>
        <v-btn
          style="background-color: white"
          @click="pageStore().decreaseFontSize(props.itemId)"
        >
          <v-icon icon="mdi-minus"></v-icon>
        </v-btn>

        <v-btn
          style="background-color: white"
          @click="pageStore().increaseFontSize(props.itemId)"
        >
          <v-icon icon="mdi-plus"></v-icon>
        </v-btn>
      </v-btn-toggle>

      <v-btn-toggle v-model="alignment" variant="outlined" divided>
        <v-btn
          style="background-color: white"
          @click="pageStore().changePageItemColumn(props.itemId, 'left')"
        >
          <v-icon icon="mdi-format-align-left"></v-icon>
        </v-btn>

        <v-btn
          style="background-color: white"
          @click="pageStore().changePageItemColumn(props.itemId, 'middle')"
        >
          <v-icon icon="mdi-format-align-center"></v-icon>
        </v-btn>

        <v-btn
          style="background-color: white"
          @click="pageStore().changePageItemColumn(props.itemId, 'right')"
        >
          <v-icon icon="mdi-format-align-right"></v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>
<style scoped lang="scss">
.toolbox-container {
  position: absolute;
  width: max-content;

  .close-btn {
    position: absolute;
    top: -33px;
    right: 10px;
  }
}
</style>
