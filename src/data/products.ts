import heroImg from "../assets/hero.jpg";
import sophieImg from "../assets/sophie.jpg";
import marshaImg from "../assets/marsha.jpg";
import graceImg from "../assets/grace.jpg";
import vivienneImg from "../assets/vivienne.jpg";
import sylviaImg from "../assets/sylvia.jpg";

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "sophie",
    title: "SOPHIE – Angelic Sound Engineer",
    category: "MUSIC",
    price: 89,
    image: sophieImg,
    description:
      "Rewrote the future of sound. A tribute to fluid identity, synthetic emotion and the power of sound as self-expression.",
  },
  {
    id: "marsha",
    title: "MARSHA P. JOHNSON – Resistance Warrior",
    category: "ACTIVISM",
    price: 89,
    image: marshaImg,
    description:
      "Marsha P. Johnson represents the fight for liberation and visibility.",
  },
  {
    id: "grace",
    title: "GRACE JONES – Warrior Woman From Beyond",
    category: "MOVIE",
    price: 89,
    image: graceImg,
    description:
      "Fearless. Untouchable. Iconic. A fusion of power, performance and presence.",
  },
  {
    id: "vivienne",
    title: "VIVIENNE WESTWOOD – Punk Designer",
    category: "FASHION",
    price: 89,
    image: vivienneImg,
    description:
      "An icon of rebellion and anti-fashion turned into a powerful collectible.",
  },
  {
    id: "sylvia",
    title: "SYLVIA RIVERA – Activist Hero",
    category: "ACTIVISM",
    price: 89,
    image: sylviaImg,
    description:
      "A fighter for justice and community. Rivera’s legacy is fearless.",
  },
];
