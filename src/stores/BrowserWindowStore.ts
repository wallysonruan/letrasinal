import { defineStore } from "pinia";
import { ref } from "vue";

const windowWidth = ref(0);
const windowHeight = ref(0);

windowWidth.value = window.innerWidth;
windowHeight.value = window.innerHeight;

window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
});

function getWindowWidth() {
  return windowWidth.value;
}

function getWindowHeight() {
  return windowHeight.value;
}

function getWindowWidthPercentage(percentage: number) {
  return windowWidth.value * (percentage / 100);
}

function getWindowHeightPercentage(percentage: number) {
  return windowHeight.value * (percentage / 100);
}

const browserWindowStore = defineStore({
  id: "browserWindowStore",
  // state: () => ({}),
  actions: {
    getWindowWidth,
    getWindowHeight,
    getWindowWidthPercentage,
    getWindowHeightPercentage,
  },
});

export default browserWindowStore;
