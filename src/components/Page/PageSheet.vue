<script setup lang="ts">
import PageItem from "@/components/PageItem/PageItem.vue";
import type { StyleValue } from "vue";

const sheetSizes = {
  a4: {
    width: 794,
    height: 1123,
  },
};

const sheetStyles: StyleValue = {
  padding: "1rem",
};

const sheetContentStyles: StyleValue = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  columnGap: "3rem",
  alignContent: "baseline",
  height: "inherit",
};

const items = {
  text: [
    "M519x515S1005f498x485S26501481x486",
    "Opa, bem!",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "Opa, como 'tá?",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "Opa, como vai?",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "Opa, bão",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "Opa, como está! ALKSDANS DASD ALSKDANS DALKSJDADN SDK.VS DLFKJSD FKSDKN",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "Opa, bem!",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "Opa, como 'tá?",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "Opa, como vai?",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "Opa, bão",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "Opa, bem!",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "Opa, como 'tá?",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "Opa, como vai?",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "Opa, bão",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "Opa",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "Opa, bem!",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "Opa, como 'tá?",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "Opa, como vai?",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "Opa, bão",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "Opa",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
    "M519x515S1005f498x485S26501481x486",
    "Opa, bem!",
    "M518x560S2ff00482x483S14c00488x503S26c06491x533S22130474x497",
    "Opa, como 'tá?",
    "M521x526S36d00479x475S37800480x478S37804480x509S15a32470x483S20e00456x483S2380b467x503",
    "Opa, como vai?",
    "M527x533S10059474x495S2ea06502x500S14040485x467S2d728486x519",
    "Opa, bão",
    "M529x554S30004482x483S1dc09506x501S2df10506x533",
    "Opa",
    "M527x527S1bb40506x485S21e00512x474S21e00475x474S1bb48474x483S26a20487x513",
  ],
};
</script>
<template>
  <div class="printable">
    <v-sheet
      class="sheet"
      :width="sheetSizes.a4.width"
      :height="sheetSizes.a4.height"
      :style="sheetStyles"
    >
      <div class="page-content" :style="sheetContentStyles">
        <PageItem v-for="item in items.text" :key="item" :item="item" />
      </div>
    </v-sheet>
  </div>
</template>
<style scoped lang="scss">
.sheet {
  border: 1px solid rgb(0, 0, 0, 0.2);
  overflow: hidden;

  &:hover {
    cursor: text;
  }
}
</style>
