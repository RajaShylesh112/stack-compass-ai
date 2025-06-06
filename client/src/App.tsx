
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AIRecommendations from "./pages/AIRecommendations";
import CompareStacks from "./pages/CompareStacks";
import CompareTools from "./pages/CompareTools";
import Analytics from "./pages/Analytics";
import CompatibilityExplorer from "./pages/CompatibilityExplorer";
import StackWorkspace from "./pages/StackWorkspace";
import StackBuilder from "./pages/StackBuilder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-recommendations" element={<AIRecommendations />} />
          <Route path="/compare/stacks" element={<CompareStacks />} />
          <Route path="/compare/tools" element={<CompareTools />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/insights/compatibility" element={<CompatibilityExplorer />} />
          <Route path="/stacks" element={<StackWorkspace />} />
          <Route path="/stacks/new" element={<StackBuilder />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
