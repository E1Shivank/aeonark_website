import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, ShoppingCart, User, Mail, Building, Star, Bot, Smartphone, Wrench } from "lucide-react";
import { authService } from "@/lib/auth";

// Animated stars background
const TwinklingStars = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {[...Array(100)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      >
        <div className="w-0.5 h-0.5 bg-white rounded-full opacity-60" />
      </div>
    ))}
  </div>
);

interface User {
  id: string;
  email: string;
  fullName?: string;
  company?: string;
  primaryGoal?: string;
  buildGoal?: string;
  isOnboarded: boolean;
}

interface CartItem {
  id: number;
  planType: string;
  planName: string;
  addOns: AddOn[];
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

const PLAN_PRICES = {
  starter: 4999,
  growth: 14999,
  scale: 49999,
};

const AVAILABLE_ADDONS: AddOn[] = [
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot Integration',
    description: 'Smart AI assistant for customer support',
    price: 2999,
    selected: false,
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Wrapper',
    description: 'iOS and Android app versions',
    price: 5000,
    selected: false,
  },
  {
    id: 'maintenance',
    name: 'Premium Maintenance',
    description: 'Monthly updates and security patches',
    price: 999,
    selected: false,
  },
];

function getPlanName(planType: string): string {
  switch (planType) {
    case 'starter':
      return 'Starter Site';
    case 'growth':
      return 'Growth Bundle';
    case 'scale':
      return 'Scale Forge';
    default:
      return 'Starter Site';
  }
}

export default function NewCartPage() {
  const [, navigate] = useLocation();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get plan from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const planType = urlParams.get('plan') || 'starter';
  const planName = getPlanName(planType);

  // Check authentication
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/auth');
      return;
    }
  }, [navigate]);

  const session = authService.getStoredSession();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/user'],
    queryFn: () => apiRequest('/api/user', 'GET', null, {
      headers: { Authorization: `Bearer ${session?.token}` },
    }),
    enabled: !!session?.token,
  });

  const { data: cartData, isLoading: cartLoading } = useQuery({
    queryKey: ['/api/cart'],
    queryFn: () => apiRequest('/api/cart', 'GET', null, {
      headers: { Authorization: `Bearer ${session?.token}` },
    }),
    enabled: !!session?.token,
  });

  const saveCartMutation = useMutation({
    mutationFn: (data: { planType: string; planName: string; addOns: AddOn[] }) => {
      return apiRequest('/api/cart', 'POST', data, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
    },
    onSuccess: () => {
      toast({
        title: "Cart Updated",
        description: "Your selections have been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Initialize selected add-ons from cart data
  useEffect(() => {
    if (cartData?.cartItem?.addOns) {
      const selectedIds = cartData.cartItem.addOns
        .filter((addon: AddOn) => addon.selected)
        .map((addon: AddOn) => addon.id);
      setSelectedAddOns(selectedIds);
    }
  }, [cartData]);

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const saveCart = () => {
    const addOns = AVAILABLE_ADDONS.map(addon => ({
      ...addon,
      selected: selectedAddOns.includes(addon.id),
    }));

    saveCartMutation.mutate({
      planType,
      planName,
      addOns,
    });
  };

  const calculateTotal = () => {
    const basePrice = PLAN_PRICES[planType as keyof typeof PLAN_PRICES];
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addon = AVAILABLE_ADDONS.find(a => a.id === addOnId);
      return total + (addon?.price || 0);
    }, 0);
    return basePrice + addOnTotal;
  };

  const handleProceedToPayment = () => {
    toast({
      title: "Coming Soon",
      description: "Payment integration will be available soon. Your cart has been saved.",
    });
  };

  if (userLoading || cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <TwinklingStars />
        <div className="relative z-10 flex items-center space-x-2 text-white">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-xl">Loading your cart...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 relative overflow-hidden">
      <TwinklingStars />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img 
              src="/Aeonark/src/assets/aeonark-logo.png" 
              alt="Aeonark Labs" 
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold">Your Cart</h1>
              <p className="text-gray-400">Review and customize your selection</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => authService.signOut().then(() => navigate('/'))}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{user?.user?.email}</span>
                </div>
                {user?.user?.fullName && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="w-4 h-4" />
                    <span>{user.user.fullName}</span>
                  </div>
                )}
                {user?.user?.company && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Building className="w-4 h-4" />
                    <span>{user.user.company}</span>
                  </div>
                )}
                {user?.user?.primaryGoal && (
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400">Primary Goal</p>
                    <p className="text-white">{user.user.primaryGoal}</p>
                  </div>
                )}
                {user?.user?.buildGoal && (
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400">What you want to build</p>
                    <p className="text-white text-sm">{user.user.buildGoal}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Cart Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Plan */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Selected Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <h3 className="text-xl font-bold text-green-400">{planName}</h3>
                    <p className="text-gray-400">Perfect for your needs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">₹{PLAN_PRICES[planType as keyof typeof PLAN_PRICES]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Add-ons
                </CardTitle>
                <CardDescription>
                  Enhance your plan with additional features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {AVAILABLE_ADDONS.map((addon) => (
                  <div key={addon.id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                    <Checkbox
                      id={addon.id}
                      checked={selectedAddOns.includes(addon.id)}
                      onCheckedChange={() => handleAddOnToggle(addon.id)}
                      className="border-gray-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {addon.id === 'ai-chatbot' && <Bot className="w-4 h-4" />}
                        {addon.id === 'mobile-app' && <Smartphone className="w-4 h-4" />}
                        {addon.id === 'maintenance' && <Wrench className="w-4 h-4" />}
                        <label htmlFor={addon.id} className="font-medium cursor-pointer">
                          {addon.name}
                        </label>
                      </div>
                      <p className="text-sm text-gray-400">{addon.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">₹{addon.price}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{planName}</span>
                  <span>₹{PLAN_PRICES[planType as keyof typeof PLAN_PRICES]}</span>
                </div>
                {selectedAddOns.length > 0 && (
                  <>
                    <Separator className="bg-gray-700" />
                    {selectedAddOns.map(addOnId => {
                      const addon = AVAILABLE_ADDONS.find(a => a.id === addOnId);
                      return addon ? (
                        <div key={addOnId} className="flex justify-between text-sm">
                          <span>{addon.name}</span>
                          <span>₹{addon.price}</span>
                        </div>
                      ) : null;
                    })}
                  </>
                )}
                <Separator className="bg-gray-700" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={saveCart}
                disabled={saveCartMutation.isPending}
                className="flex-1 bg-gray-700 hover:bg-gray-600"
              >
                {saveCartMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Cart'
                )}
              </Button>
              <Button
                onClick={handleProceedToPayment}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}