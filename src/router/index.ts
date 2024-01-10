import { createRouter, createWebHistory } from "vue-router";
import TextEditor from "@/views/TextEditor.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TextEditor,
    },
  ],
});

export default router;
