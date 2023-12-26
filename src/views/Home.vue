<script setup lang="ts">
import SortableList from "@/components/SortableList.vue";
import DraggableItem from "@/components/DraggableItem.vue";
import { ref } from "vue";

const input = ref("");

function onInput(e: InputEvent) {}
</script>
<template>
  <div>
    <v-text-field v-model="input" @input="onInput" />

    <div class="list">
      <SortableList>
        <DraggableItem v-for="(item, index) in input.split(' ')" :key="index">
          <fsw-sign :sign="item"></fsw-sign>
        </DraggableItem>
      </SortableList>
    </div>
  </div>
</template>
<style scoped lang="scss">
.list {
  height: 20rem;
  width: max-content;
  overflow: hidden;
}
</style>
