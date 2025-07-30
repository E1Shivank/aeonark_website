import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Testimonials from "@/pages/Testimonials";
import AeonForge from "@/pages/AeonForge";
import AeonRFP from "@/pages/AeonRFP";
import AeonAgent from "@/pages/AeonAgent";
import AuthPage from "@/pages/NewAuthPage";
import OnboardingPage from "@/pages/NewOnboardingPage";
import CartPage from "@/pages/NewCartPage";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/contact" component={Contact} />
      <Route path="/aeonforge" component={AeonForge} />
      <Route path="/aeonrfp" component={AeonRFP} />
      <Route path="/aeonagent" component={AeonAgent} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/cart" component={CartPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthRouter() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/cart" component={CartPage} />
      <Route component={Router} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/new-auth" component={AuthPage} />
        <Route path="/onboarding" component={OnboardingPage} />
        <Route path="/new-onboarding" component={OnboardingPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/new-cart" component={CartPage} />
        <Route>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </Route>
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
