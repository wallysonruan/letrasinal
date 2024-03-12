import { createRouter, createWebHistory } from "vue-router";
import TextEditor2 from "@/views/TextEditor/TextEditor2.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TextEditor2,
    },
  ],
});

export default router;
