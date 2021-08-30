import { createApp } from "vue";
import App from "./App.vue";
import { Button, Collapse, CollapseItem } from "vant";
import VueCupUi from "vue-cup-ui";
import "vue-cup-ui/lib/vue-cup-ui.css";
import "vant/lib/index.css";

const app = createApp(App);
app.use(Button).use(Collapse).use(CollapseItem).use(VueCupUi).mount("#app");
