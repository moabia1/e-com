export default function ReceiptModal({ receipt, onClose, name, email }) {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-[fadeIn_.25s_ease]">
        {/* Success Icon */}
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
            <span className="text-green-600 text-2xl">✔</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center mt-4 text-gray-800">
          Payment Successful
        </h2>

        <p className="text-center text-gray-600 mt-1">
          Here is your receipt.
        </p>

        <div className="mt-5 bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="text-sm">
            <span className="font-medium text-gray-700">Receipt ID:</span>{" "}
            <span className="text-gray-800">{receipt.receiptId}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Your Name:</span>{" "}
            <span className="text-gray-800">Md Moabia</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Email ID:</span>{" "}
            <span className="text-gray-800">mdmoabia81@gmail.com</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Total Paid:</span>{" "}
            <span className="font-semibold text-green-600">
              ₹{receipt.total}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Time:</span>{" "}
            <span className="text-gray-800">
              {new Date(receipt.timestamp).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium active:scale-95 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
