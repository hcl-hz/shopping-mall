import { Categories } from "./components/main/Categories";
import { MainBanner } from "./components/main/MainBanner";
import { ProductList } from "./components/products/ProductList";

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-300">
      <MainBanner />
      <Categories />
      <div className="container mx-auto px-4 py-8">
        <section className="bg-pink-300 rounded-lg p-8">
          <h2 className="text-lg font-bold mb-6">전체 상품</h2>
          <ProductList />
        </section>
      </div>
    </main>
  );
}
