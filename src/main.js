import "./assets/main.css";
import "primeicons/primeicons.css";
import "vue-toastification/dist/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import router from "./router";
import App from "./App.vue";

import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(Toast);
app.use(pinia);
app.use(PrimeVue);
app.use(Vue3ColorPicker);

app.component("VueDatePicker", VueDatePicker);
app.mount("#app");
