type Category = "sport" | "art"; // här får man fylla på med kategorier

export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  categories: Category[];
  price: number;
};
