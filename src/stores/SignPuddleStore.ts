import { defineStore } from "pinia";

const signPuddleSearchStore = defineStore({
  id: "signPuddleStore",
  state: () => ({
    activateSignPuddleSearch: false,
  }),
  actions: {
    toggleSignPuddleSearch() {
      this.activateSignPuddleSearch = !this.activateSignPuddleSearch;
    },
    isSignPuddleSearchActive() {
      return this.activateSignPuddleSearch;
    },
  },
});

export default signPuddleSearchStore;
