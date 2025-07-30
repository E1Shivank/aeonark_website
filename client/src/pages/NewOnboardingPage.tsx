import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, type OnboardingData } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, User, Building, Target, Lightbulb } from "lucide-react";
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

export default function NewOnboardingPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Get plan from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const planType = urlParams.get('plan') || 'starter';

  // Check authentication
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/auth');
      return;
    }
  }, [navigate]);

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: '',
      company: '',
      primaryGoal: undefined,
      buildGoal: '',
    },
  });

  const onboardingMutation = useMutation({
    mutationFn: async (data: OnboardingData) => {
      const session = authService.getStoredSession();
      if (!session) throw new Error('No authentication session');

      return apiRequest('/api/onboarding', 'POST', data, {
        headers: {
          'Authorization': `Bearer ${session.token}`,
        },
      });
    },
    onSuccess: (data) => {
      // Update stored session with new user data
      const session = authService.getStoredSession();
      if (session) {
        session.user = data.user;
        authService.storeSession(session);
      }
      
      toast({
        title: "Welcome aboard!",
        description: "Your profile has been set up successfully.",
      });
      navigate(`/cart?plan=${planType}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: OnboardingData) => {
    onboardingMutation.mutate(data);
  };

  const skipOnboarding = () => {
    navigate(`/cart?plan=${planType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <TwinklingStars />
      
      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/Aeonark/aeonark-logo.png" 
              alt="Aeonark Labs" 
              className="h-12 w-12 object-contain"
            />
            <h1 className="text-3xl font-bold">Welcome to Aeonark Labs</h1>
          </div>
          <p className="text-gray-400">Let's personalize your experience</p>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Tell us about yourself</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Help us tailor the perfect solution for your needs
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Company (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Company or startup name"
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="primaryGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Primary Goal
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-green-500">
                            <SelectValue placeholder="What's your main goal?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="Website" className="text-white hover:bg-gray-700">
                            Website Development
                          </SelectItem>
                          <SelectItem value="AI Agent" className="text-white hover:bg-gray-700">
                            AI Agent Development
                          </SelectItem>
                          <SelectItem value="Analytics Platform" className="text-white hover:bg-gray-700">
                            Analytics Platform
                          </SelectItem>
                          <SelectItem value="Other" className="text-white hover:bg-gray-700">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="buildGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        What do you want to build?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project idea or what you want to achieve..."
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    disabled={onboardingMutation.isPending}
                  >
                    {onboardingMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Setting up your profile...
                      </>
                    ) : (
                      'Continue to Cart'
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={skipOnboarding}
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Skip for now
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}