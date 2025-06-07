
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import Index from "./pages/Index";
import AIRecommendations from "./pages/AIRecommendations";
import CompareStacks from "./pages/CompareStacks";
import CompareTools from "./pages/CompareTools";
import Analytics from "./pages/Analytics";
import CompatibilityExplorer from "./pages/CompatibilityExplorer";
import StackWorkspace from "./pages/StackWorkspace";
import StackBuilder from "./pages/StackBuilder";
import UserProfile from "./pages/UserProfile";
import Pricing from "./pages/Pricing";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/ai-recommendations" component={AIRecommendations} />
          <Route path="/compare/stacks" component={CompareStacks} />
          <Route path="/compare/tools" component={CompareTools} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/insights/compatibility" component={CompatibilityExplorer} />
          <Route path="/stacks" component={StackWorkspace} />
          <Route path="/workspace" component={StackWorkspace} />
          <Route path="/stacks/new" component={StackBuilder} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/pricing" component={Pricing} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
