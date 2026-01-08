import "./scss/style.scss";
import "./services/productService";
import "./utils/cartUtils";
import "./utils/htmlUtils";
import "./utils/pageUtils";
import { createAllProductCards } from "./utils/htmlUtils";
import { findCart } from "./utils/cartUtils";

createAllProductCards();
findCart();
