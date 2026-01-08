import "./style.css";
import "./style.scss";
import "./services/productService";
import "./utils/cartUtils";
import { initPdp } from "./pages/pdp/pdp";



// Kör PDP-kod bara på pdp-sidan
if (window.location.pathname.includes("pdp")) {
  console.log("CALLING initPdp");
  initPdp();
}