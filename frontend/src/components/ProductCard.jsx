export default function ProductCard({ product, onAdd }) {
  const imgSrc =
    product.image ||
    "https://via.placeholder.com/400x300.png?text=No+Image+Available";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all duration-200 flex flex-col overflow-hidden w-[240px] h-[360px]">
      {/* IMAGE */}
      <div className="w-full h-[140px] bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          className="h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}

        <p className="text-md font-semibold text-purple-700 mt-2">
          ₹{product.price}
        </p>

        <button
          onClick={() => onAdd(product)}
          className="mt-auto w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl font-medium active:scale-95 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
