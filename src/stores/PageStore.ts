import { defineStore } from "pinia";

const signPuddleSearchStore = defineStore({
  id: "pageStore",
  state: () => ({
    items: <any>[],
  }),
  actions: {
    addItem(item: unknown) {
      this.items.push(item);
    },
  },
});

export default signPuddleSearchStore;
