import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import JobForm from "./components/JobForm";
import ForwardToMain from "./forwardToMain";
import AlreadyApplied from "./pages/AlreadyApplied";

const queryClient = new QueryClient();

const ForwardToMainRoute = () => {
  ForwardToMain();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ForwardToMainRoute />} />
          <Route path="/company/:formId/application/already-applied" element={<AlreadyApplied />} />
          <Route path="/company/:formId/application" element={<JobForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
