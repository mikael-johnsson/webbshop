import "./style.css";
import "./style.scss";
import "./services/serviceBase";
import { getProducts } from "./services/serviceBase";

const data = await getProducts();
console.log(data.products);
