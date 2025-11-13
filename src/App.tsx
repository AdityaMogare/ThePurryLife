import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Import our new components and context
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login"; // Import the Login page we created
import Register from "@/pages/Register";
import { AuthProvider } from "@/context/AuthContext"; // Import the AuthProvider
import Dashboard from '@/pages/Dashboard';

import ProtectedRoute from '@/components/ProtectedRoute';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* --- Public Routes --- */}
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          {/* --- Protected Routes --- */}
          {/* 3. Create a route that acts as the "wrapper" */}
          <Route element={<ProtectedRoute />}>
            {/* Any routes nested inside here are now protected */}
            <Route path="/app/dashboard" element={<Dashboard />} />
            {/* You can add more protected routes here later: */}
            {/* <Route path="/app/profile" element={<Profile />} /> */}
            {/* <Route path="/app/matches" element={<Matches />} /> */}
          </Route>

          {/* --- Catch-all 404 Route --- */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;