<script setup lang="ts">
import type { PageItemType, SignDetails } from "@/stores/PageStore";
import { ref, watch } from "vue";

import SelectableItem from "../SelectableItem/SelectableItem.vue";
import SignWriting from "../SignWriting/SignWriting.vue";

type SignDisplayGridProps = {
  signs: { id: string; sign: string }[];
};

const props = defineProps<SignDisplayGridProps>();
const emit = defineEmits(["onSelect"]);

const selected = ref<string[]>([]);

watch(selected, (newValue) => {
  emit("onSelect", newValue);
});
</script>
<template>
  <ul class="sign-display-grid">
    <template v-for="(sign, index) in props.signs" :key="index">
      <li class="sign-display-grid-item">
        <SelectableItem :value="sign.id" v-model="selected">
          <SignWriting :fsw="sign.sign"></SignWriting>
        </SelectableItem>
      </li>
    </template>
  </ul>
</template>
<style scoped lang="scss">
.sign-display-grid {
  list-style-type: none;
  //
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;
}
@media screen and (max-width: 600px) {
  // .sign-display-grid {
  //   display: flex;
  //   flex-direction: row;
  //   width: max-content;
  // }

  // .sign-display-grid-item {
  //   min-width: 5rem;
  //   max-width: max-content;
  // }
}
</style>
