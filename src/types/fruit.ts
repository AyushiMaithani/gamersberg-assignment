
export interface Item {
  name: string;
  value: number;
  price: number;
  image: string;
}

export const SAMPLE_ITEMS: Item[] = [
  { name: "Rocket", value: 75000, price: 5000, image: "/RocketFruit.webp" },
  { name: "Spin", value: 5000, price: 7500, image: "/SpinFruit.webp" },
  { name: "Spring", value: 60000, price: 60000, image: "/SpringFruit.webp" },
  { name: "Bomb", value: 60000, price: 80000, image: "/BombFruit.webp" },
  { name: "Chop", value: 80000, price: 60000, image: "/ChopFruit.webp" },
];