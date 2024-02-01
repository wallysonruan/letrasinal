<script setup lang="ts">
import { ref } from "vue";
import pageStore from "../../../../../stores/PageStore";

const input = ref("");

function convertSimpleFswIntoPageItem(fsw: string) {
  return pageStore().createSignPageItem("sign", fsw, ["CUSTOM"]);
}

function handleOk() {
  input.value.split(" ").forEach((fsw) => {
    const pageItem = convertSimpleFswIntoPageItem(fsw);
    pageStore().addPageItem(pageItem);
  });

  input.value = "";
}
</script>
<template>
  <div class="fsw-import-container">
    <h2 class="fsw-title">Importe seu FSW</h2>
    <!--  -->
    <div class="fsw-input">
      <v-textarea
        v-model="input"
        placeholder="Ex.: M543x532S34100481x483S17610527x495"
        variant="outlined"
        hide-details
      ></v-textarea>
    </div>
    <!--  -->
    <div class="fsw-actions">
      <v-btn
        type="submit"
        color="rgb(39, 103, 39, 1)"
        width="50%"
        :disabled="input.length < 1"
        @click="handleOk"
      >
        Adicionar
      </v-btn>
    </div>
  </div>
</template>
<style scoped lang="scss">
.fsw-import-container {
  padding-top: 0.5rem;

  .fsw-title {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }

  .fsw-actions {
    display: flex;
    justify-content: right;
    margin-top: 0.3rem;
  }
}
</style>
