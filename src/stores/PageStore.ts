import { defineStore } from "pinia";
import { type PageItemType } from "@/components/PageItem/PageItem.vue";
import { ref } from "vue";

const items = ref<PageItemType[]>([]);

function addPageItem(newItem: PageItemType, id: string = "") {
  if (id === "") {
    items.value.push(newItem);
    return;
  }

  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.value.splice(index + 1, 0, newItem);
  }
}

function addPageItems(itemsArray: PageItemType[]) {
  itemsArray.forEach((item) => {
    items.value.push(item);
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
