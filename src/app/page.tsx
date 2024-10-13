import Navbar from "@/components/Nav";
import Hero from "@/components/Hero";
import Repos from "@/components/Repos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Repos />
      <Footer />
    </main>
  );
}
