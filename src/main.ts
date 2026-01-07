import "./style.scss";
console.log("MAIN LOADED");

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Missing #app element");

startRouter(app);
app.innerHTML = "<h1>APP FUNKAR</h1>";


