<script setup lang="ts">
import type { PageItemType, SignDetails } from "@/stores/PageStore";
import { ref, watch } from "vue";

import SelectableItem from "../SelectableItem/SelectableItem.vue";
import SignWriting from "../SignWriting/SignWriting.vue";

type SignDisplayGridProps = {
  signs: PageItemType[];
};

const props = defineProps<SignDisplayGridProps>();
const emit = defineEmits(["onSelect"]);

const selected = ref<string[]>([]);

watch(selected, (newValue) => {
  emit("onSelect", newValue);
});
</script>
<template>
  <ul class="search-results">
    <template v-for="(sign, index) in props.signs" :key="index">
      <li class="result">
        <SelectableItem :value="sign.id" v-model="selected">
          <SignWriting :fsw="(sign.details as SignDetails).fsw"></SignWriting>
        </SelectableItem>
      </li>
    </template>
  </ul>
</template>
<style scoped lang="scss">
.search-results {
  list-style-type: none;
  //
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;
}
</style>
