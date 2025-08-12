import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/router";
import AuthProvider from "./contexts/Auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const queryClient = new QueryClient();

const stripePromise = loadStripe(import.meta.env.VITE_publishable_key);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </Elements>
  </StrictMode>
);
