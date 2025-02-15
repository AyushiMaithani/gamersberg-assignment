import { FruitCalculator } from "@/components/FruitCalculator";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A1B]">
      <Navbar/>
      <FruitCalculator />
    </main>
  );
}
