<script setup lang="ts">
import TextEditorDrawer from "./TextEditorDrawer/TextEditorDrawer.vue";
import TextEditorPage from "./Page/TextEditorPage.vue";
import PageItem from "@/components/Sheet/PageItem/PageItem.vue";
import type { PageItemType } from "@/stores/PageStore";

const signs: PageItemType[] = [
  {
    id: "string",
    type: "sign",
    details: {
      fsw: "M539x556S33b00482x483S21100507x503S18617491x530S22f07518x515",
    },
  },
  {
    id: "string",
    type: "sign",
    details: {
      fsw: "M539x556S33b00482x483S21100507x503S18617491x530S22f07518x515",
    },
  },
];
</script>
<template>
  <div class="TextEditor">
    <TextEditorDrawer />
    <v-main>
      <div class="TextEditorPagesContainer">
        <div class="TextEditorPageContainer">
          <TextEditorPage>
            <div v-for="(sign, index) in signs" :key="index">
              <PageItem :page-id="1" :item="sign" />
            </div>
          </TextEditorPage>
        </div>
      </div>
    </v-main>
  </div>
</template>
<style scoped lang="scss">
.TextEditor {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .TextEditorPagesContainer {
    width: 100%;
    height: 100%;
    padding: 1rem 1rem;
    margin: auto;
    overflow: auto;
    background-color: inherit;

    .TextEditorPageContainer {
      width: 100%;
      height: 100%;
      background-color: inherit;
    }
  }
}

@media (prefers-color-scheme: dark) {
  .TextEditor {
    background-color: rgb(66, 65, 65);
  }
}
</style>
