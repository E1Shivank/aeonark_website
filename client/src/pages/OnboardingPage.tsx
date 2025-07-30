import { useState } from "react";
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
import TwinklingStars from "@/components/animations/TwinklingStars";

export default function OnboardingPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Get plan from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const planType = urlParams.get('plan') || 'starter';

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
    mutationFn: (data: OnboardingData) => {
      const token = localStorage.getItem('authToken');
      return apiRequest('/api/onboarding', 'POST', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Welcome aboard!",
        description: "Your profile has been set up successfully.",
      });
      navigate(`/cart?plan=${planType}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to complete onboarding. Please try again.",
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Twinkling Stars Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-green-900/10" />
        <TwinklingStars />
      </div>
      
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
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
            <CardDescription className="text-gray-400">
              Help us tailor our services to your needs
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
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
                      <FormLabel className="text-gray-300 flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Company / Startup (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your company name"
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="primaryGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Primary Goal
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-green-500">
                            <SelectValue placeholder="What's your main focus?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="Website" className="focus:bg-gray-700">
                            Website Development
                          </SelectItem>
                          <SelectItem value="AI Agent" className="focus:bg-gray-700">
                            AI Agent Solution
                          </SelectItem>
                          <SelectItem value="Analytics Platform" className="focus:bg-gray-700">
                            Analytics Platform
                          </SelectItem>
                          <SelectItem value="Other" className="focus:bg-gray-700">
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
                      <FormLabel className="text-gray-300 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        What do you want to build?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell us about your vision, project, or goals..."
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={skipOnboarding}
                    className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Skip for now
                  </Button>
                  
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    disabled={onboardingMutation.isPending}
                  >
                    {onboardingMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Complete Setup'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>You can always update this information later in your profile settings</p>
        </div>
      </div>
    </div>
  );
}