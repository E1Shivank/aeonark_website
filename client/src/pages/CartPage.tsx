import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, ShoppingCart, User, Mail, Building, Star, Bot, Smartphone, Wrench } from "lucide-react";
import TwinklingStars from "@/components/animations/TwinklingStars";

interface User {
  id: number;
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

export default function CartPage() {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get plan from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const planType = urlParams.get('plan') || 'starter';
  const planName = getPlanName(planType);

  const token = localStorage.getItem('authToken');

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/user'],
    queryFn: () => apiRequest('/api/user', 'GET', null, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    enabled: !!token,
  });

  const { data: cartData, isLoading: cartLoading } = useQuery({
    queryKey: ['/api/cart'],
    queryFn: () => apiRequest('/api/cart', 'GET', null, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    enabled: !!token,
  });

  const saveCartMutation = useMutation({
    mutationFn: (data: { planType: string; planName: string; addOns: AddOn[] }) => {
      return apiRequest('/api/cart', 'POST', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast({
        title: "Cart Updated",
        description: "Your selection has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update cart.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    // Auto-save cart when user visits the page
    if (user && !cartLoading) {
      const addOns = AVAILABLE_ADDONS.map(addon => ({
        ...addon,
        selected: selectedAddOns.includes(addon.id),
      }));

      saveCartMutation.mutate({
        planType,
        planName,
        addOns,
      });
    }
  }, [user, planType, planName, selectedAddOns.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    const basePrice = PLAN_PRICES[planType as keyof typeof PLAN_PRICES] || 0;
    const addOnPrice = AVAILABLE_ADDONS
      .filter(addon => selectedAddOns.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price, 0);
    return basePrice + addOnPrice;
  };

  const proceedToCheckout = () => {
    toast({
      title: "Checkout Coming Soon",
      description: "We'll contact you soon to discuss your project details and payment options.",
    });
  };

  if (userLoading || cartLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Twinkling Stars Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-green-900/10" />
        <TwinklingStars />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <img 
                src="/Aeonark/src/assets/aeonark-logo.png" 
                alt="Aeonark Labs" 
                className="h-10 w-10 object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold">Your Cart</h1>
                <p className="text-gray-400">Review your selection and proceed to checkout</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Information */}
            <div className="lg:col-span-1">
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{user?.user?.email}</span>
                  </div>
                  
                  {user?.user?.fullName && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{user.user.fullName}</span>
                    </div>
                  )}
                  
                  {user?.user?.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{user.user.company}</span>
                    </div>
                  )}
                  
                  {user?.user?.primaryGoal && (
                    <div>
                      <p className="text-sm font-medium text-gray-300">Goal</p>
                      <p className="text-sm text-gray-400">{user.user.primaryGoal}</p>
                    </div>
                  )}
                  
                  {user?.user?.buildGoal && (
                    <div>
                      <p className="text-sm font-medium text-gray-300">Vision</p>
                      <p className="text-sm text-gray-400">{user.user.buildGoal}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Your Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Selected Plan */}
                  <div className="border border-green-500/30 rounded-lg p-4 bg-green-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{planName}</h3>
                        <p className="text-sm text-gray-400">
                          {getPlanDescription(planType)}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-green-600 text-white">
                          Selected
                        </Badge>
                        <p className="text-lg font-bold mt-1">
                          ₹{PLAN_PRICES[planType as keyof typeof PLAN_PRICES]?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  {/* Add-ons */}
                  <div>
                    <h3 className="font-semibold mb-4">Optional Add-ons</h3>
                    <div className="space-y-4">
                      {AVAILABLE_ADDONS.map((addon) => (
                        <div key={addon.id} className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
                          <Checkbox
                            id={addon.id}
                            checked={selectedAddOns.includes(addon.id)}
                            onCheckedChange={() => handleAddOnToggle(addon.id)}
                            className="border-gray-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {addon.id === 'ai-chatbot' && <Bot className="h-4 w-4 text-blue-400" />}
                              {addon.id === 'mobile-app' && <Smartphone className="h-4 w-4 text-green-400" />}
                              {addon.id === 'maintenance' && <Wrench className="h-4 w-4 text-yellow-400" />}
                              <label htmlFor={addon.id} className="font-medium cursor-pointer">
                                {addon.name}
                              </label>
                            </div>
                            <p className="text-sm text-gray-400">{addon.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">+₹{addon.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  {/* Total */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-400">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      One-time payment • No hidden fees • 30-day money-back guarantee
                    </p>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={proceedToCheckout}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                    disabled={saveCartMutation.isPending}
                  >
                    {saveCartMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Star className="mr-2 h-5 w-5" />
                        Proceed to Checkout
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

function getPlanDescription(planType: string): string {
  switch (planType) {
    case 'starter':
      return 'Perfect for small businesses and startups';
    case 'growth':
      return 'Ideal for growing companies with advanced needs';
    case 'scale':
      return 'Enterprise-grade solution for large organizations';
    default:
      return 'Perfect for small businesses and startups';
  }
}