import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Lazy loading pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const AdminPage = React.lazy(() => import("./pages/AdminPage"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));

const App: React.FC = () => {
  // Define routes in an array to avoid redundancy
  const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/shop", element: <ShopPage /> },
    // { path: "/admin", element: <AdminPage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/contact", element: <ContactPage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/product/:productId", element: <ProductPage /> },
  ];

  return (
    <Router>
      <Toaster />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
