import "./style.scss";
import { router } from "./router";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Hittar inte #app");

window.addEventListener("hashchange", () => router(app));
router(app);
