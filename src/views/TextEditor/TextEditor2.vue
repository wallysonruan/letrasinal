<script setup lang="ts">
import TextEditorDrawer from "./TextEditorDrawer/TextEditorDrawer.vue";
import TextEditorPage from "./Page/TextEditorPage.vue";
import PageItem from "@/components/Sheet/PageItem/PageItem.vue";
import type { PageItemType } from "@/stores/PageStore";

import { info } from "@sutton-signwriting/core/fsw";

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
      fsw: "AS10e00S10e08S20500S27100S2711cS20500S2fc00S30006S30002M544x527S10e08470x497S10e00516x497S30006482x482S20500519x484S20500471x484S27100504x464S2711c451x463S30002482x482S2fc00491x453",
    },
  },
  {
    id: "string",
    type: "sign",
    details: {
      fsw: "M559x517S1535a503x498S15352471x498S28c12441x484S28c0a531x484S20500497x484S2fa00545x510S2f900441x512",
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
            <div class="SignColumn">
              <div
                v-for="(sign, index) in signs"
                :key="index"
                style="width: min-content; background-color: red"
              >
                <PageItem :page-id="1" :item="sign" />
              </div>
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

      .SignColumn {
        width: 150px;
        border: 1px solid black;
        position: relative;

        &::before {
          content: "";
          display: block;
          position: absolute;
          width: 1px;
          height: 100%;
          left: 50%;
          background-color: red;
        }
      }
    }
  }
}

@media (prefers-color-scheme: dark) {
  .TextEditor {
    background-color: rgb(66, 65, 65);
  }
}
</style>
