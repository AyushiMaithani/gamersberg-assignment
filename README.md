# GamersBerg Calculator ✨⚽

GamersBerg Calculator is a user-friendly tool designed for gamers to calculate the total value and price of selected Blox Fruits in the game. The platform offers an intuitive UI and seamless experience for users to explore fruit properties and perform calculations effortlessly.

---

## 🚀 Features

- **Fruit Data Overview**  
  Access detailed information for 5-6 Blox Fruits, including their name, value, and price.

- **Fruit Selection**  
  Choose multiple fruits to calculate combined totals.

- **Value and Price Calculation**  
  Automatically compute the total combined value and price of selected fruits.

- **Responsive and Modern UI**  
  Built with ShadCN components for a polished user experience.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) for routing and server-side rendering.
- **State Management:** [Jotai](https://jotai.org/) for efficient and lightweight state handling.
- **UI Library:** [ShadCN](https://shadcn.dev/) for modern and accessible UI components.
- **Type Safety:** Typescript for error-free and maintainable code.

---

## 🔖 Fruit Data Structure

Each fruit includes the following properties:
```typescript
interface Fruit {
  id: number;       // Unique identifier for the fruit
  name: string;     // Name of the fruit
  value: number;    // In-game value of the fruit (for calculations)
  price: number;    // In-game price of the fruit
}
```
---

## 📸 Screenshots

