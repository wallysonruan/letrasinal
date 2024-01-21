import { defineStore } from "pinia";
import { ref } from "vue";

const windowWidth = ref(0);

windowWidth.value = window.innerWidth;

window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

const browserWindowStore = defineStore({
  id: "browserWindowStore",
  state: () => ({
    windowWidth: windowWidth,
  }),
  actions: {},
});

export default browserWindowStore;
