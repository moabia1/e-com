import { useEffect, useState } from "react";
import { fetchProducts, addToCart } from "../services/api";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => toast.error("Failed to load products 😔"));
  }, []);

  const handleAdd = async (p) => {
    try {
      setBusyId(p.id);

      await addToCart({
        productId: p.id,
        name: p.name,
        price: p.price,
        qty: 1,
      });

      toast.success(`Item added to cart`);
    } catch (err) {
      toast.error("❌ Failed to add to cart");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Products</h1>

      {/* Loading */}
      {products.length === 0 && (
        <div className="text-gray-500">Loading products...</div>
      )}

      {/* Product Grid */}
      <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className={`${
              busyId === p.id ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <ProductCard product={p} onAdd={handleAdd} />
          </div>
        ))}
      </div>
    </div>
  );
}
