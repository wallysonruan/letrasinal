import { defineStore } from "pinia";
import { type PageItemType } from "@/components/PageItem/PageItem.vue";

const items: PageItemType[] = [
  {
    id: "askldjas",
    type: "sign",
    details: {
      fsw: "M521x520S36d00479x480S37900478x480S20500465x508S20311466x488",
      words: ["oi", "OI"],
    },
  },
  {
    id: "teste",
    type: "sign",
    details: {
      fsw: "M530x525S15d0a471x495S2f900477x519S14710495x476S21410513x478S2e238511x493",
      words: ["oi", "OI"],
    },
  },
];

function addPageItem(newItem: PageItemType, id: string = "") {
  if (id === "") {
    items.push(newItem);
    return;
  }

  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.splice(index + 1, 0, newItem);
  }
}

function addPageItems(itemsArray: PageItemType[]) {
  itemsArray.forEach((item) => {
    items.push(item);
  });
}

const pageStore = defineStore({
  id: "pageStore",
  state: () => ({
    items: items,
  }),
  actions: {
    addPageItem,
    addPageItems,
  },
});

export default pageStore;
