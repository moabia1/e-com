import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <AppRoutes />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500 text-center">
          Built for screening • Mock 
          <span className="font-medium text-purple-700">E-Com Cart</span>{" "}
        </div>
      </footer>

      {/* TOASTS */}
      <ToastContainer position="top-right" autoClose={1200} theme="dark" />
    </div>
  );
}
