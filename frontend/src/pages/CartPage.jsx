import { useEffect, useState } from "react";
import { getCart, addToCart, removeItem } from "../services/api";
import CartItemRow from "../components/CartItemRow";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const inc = async (item) => {
    // Optimistic UI
    setCart((prev) => {
      const items = prev.items.map((i) =>
        i.productId === item.productId
          ? { ...i, qty: i.qty + 1, lineTotal: (i.qty + 1) * i.price }
          : i
      );
      const total = items.reduce((s, x) => s + x.lineTotal, 0);
      return { items, total };
    });

    await addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      qty: 1,
    });
  };

  const dec = async (item) => {
    if (item.qty <= 1) return;

    // Optimistic UI
    setCart((prev) => {
      const items = prev.items.map((i) =>
        i.productId === item.productId
          ? { ...i, qty: i.qty - 1, lineTotal: (i.qty - 1) * i.price }
          : i
      );
      const total = items.reduce((s, x) => s + x.lineTotal, 0);
      return { items, total };
    });

    await removeItem(item._id || item.id);
    await addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      qty: item.qty - 1,
    });
  };

  const remove = async (id) => {
    // Optimistic UI
    setCart((prev) => {
      const items = prev.items.filter((i) => (i._id || i.id) !== id);
      const total = items.reduce((s, x) => s + x.lineTotal, 0);
      return { items, total };
    });

    await removeItem(id);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-500">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left: Items */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-semibold">Your Cart</h1>

          {cart.items.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
              <div className="text-4xl mb-2">🛒</div>
              <div className="text-gray-700 font-medium">
                Your cart is empty
              </div>
              <p className="text-gray-500 mt-1">Add items to get started.</p>
              <Link
                to="/products"
                className="inline-flex mt-4 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.map((item) => (
                <CartItemRow
                  key={item._id || item.id}
                  item={item}
                  onIncrease={inc}
                  onDecrease={dec}
                  onRemove={remove}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <aside className="bg-white border border-gray-200 rounded-2xl shadow-sm h-fit sticky top-20 p-5">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{cart.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-emerald-600 font-medium">Free</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₹{cart.total}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className={`mt-5 w-full inline-flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 transition ${
              cart.items.length === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/products"
            className="mt-3 w-full inline-flex items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 transition"
          >
            Continue Shopping
          </Link>

          <p className="mt-3 text-xs text-gray-500">
            Prices include all applicable taxes.
          </p>
        </aside>
      </div>
    </div>
  );
}
