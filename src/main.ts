import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "vuetify/styles";
import App from "./App.vue";
import router from "./router";

library.add(fas); // Include solid icons
library.add(far); // Include regular icons

import { createVuetify } from "vuetify";

import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa-svg";
import * as components from "vuetify/components";

const vuetify = createVuetify({
  components: components,
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
