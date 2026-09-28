import type { Metadata } from "next";
import CalculatorApp from "./components/CalculatorApp";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <CalculatorApp />;
}
