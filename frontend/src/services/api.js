import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export async function fetchProducts() {
  const { data } = await api.get("/products");
  return data; // [{id, name, price}]
}

export async function getCart() {
  const { data } = await api.get("/cart");
  return data; // { items, total }
}

export async function addToCart({ productId, name, price, qty = 1 }) {
  const { data } = await api.post("/cart", { productId, name, price, qty });
  return data; // { items, total }
}

export async function removeItem(id) {
  const { data } = await api.delete(`/cart/${id}`);
  return data;
}

export async function checkout({ cartItems, name, email }) {
  const { data } = await api.post("/cart/checkout", { cartItems, name, email });
  return data; // { receipt }
}
