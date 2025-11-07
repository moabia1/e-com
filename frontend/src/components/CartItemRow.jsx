export default function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 w-full">
      {/* Item Info */}
      <div className="flex-1 min-w-0">
        <div className="text-lg font-semibold text-gray-800 break-words">
          {item.name}
        </div>
        <div className="text-sm text-gray-500">
          ₹{item.price} × {item.qty} ={" "}
          <span className="font-medium text-emerald-600">
            ₹{item.lineTotal}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 active:scale-95 transition disabled:opacity-50"
            onClick={() => onDecrease(item)}
            disabled={item.qty <= 1}
          >
            –
          </button>

          <span className="w-8 text-center font-medium text-gray-800">
            {item.qty}
          </span>

          <button
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 active:scale-95 transition"
            onClick={() => onIncrease(item)}
          >
            +
          </button>
        </div>

        {/* Remove button — full width on mobile */}
        <button
          onClick={() => onRemove(item._id || item.id)}
          className="sm:ml-3 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm active:scale-95 transition w-auto sm:w-fit flex-1 sm:flex-none text-center"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
