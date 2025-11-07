import { useEffect, useState } from "react";
import { getCart, checkout } from "../services/api";
import ReceiptModal from "../components/ReceiptModal";

export default function CheckoutPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    getCart().then(setCart);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!name || !email) return setErr("Name and email are required");
    if (cart.items.length === 0) return setErr("Cart is empty");

    setBusy(true);
    try {
      const { receipt } = await checkout({
        cartItems: cart.items,
        name,
        email,
      });
      setReceipt(receipt);
      setName("");
      setEmail("");
    } catch {
      setErr("Checkout failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-semibold text-gray-900">Checkout</h1>
      <p className="text-gray-500 text-sm mt-1">
        Complete your purchase securely
      </p>

      <form
        onSubmit={onSubmit}
        className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mt-6 space-y-5"
      >
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            className="w-full mt-1 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            className="w-full mt-1 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
          />
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div className="text-gray-700 text-sm">
            Total:
            <span className="font-semibold text-purple-700 ml-1">
              ₹{cart.total}
            </span>
          </div>

          <button
            disabled={busy || cart.items.length === 0}
            className={`px-5 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 font-medium active:scale-95 transition ${
              busy || cart.items.length === 0
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            {busy ? "Processing..." : "Pay & Get Receipt"}
          </button>
        </div>

        {err && <div className="text-red-600 text-sm">{err}</div>}
      </form>

      <ReceiptModal
        receipt={receipt}
        onClose={() => setReceipt(null)}
      />
    </div>
  );
}
