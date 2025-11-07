import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/products"
          className="text-2xl font-bold tracking-tight hover:opacity-80 transition"
        >
          <span className="text-purple-700">Vibe</span>{" "}
          <span className="text-gray-500">Cart</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {["/products", "/cart", "/checkout"].map((path) => {
            const label = path
              .replace("/", "")
              .replace(/^\w/, (c) => c.toUpperCase());

            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md scale-[1.03]"
                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  }`
                }
              >
                {label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
