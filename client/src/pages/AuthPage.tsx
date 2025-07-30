import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, otpVerificationSchema, type AuthData, type OtpVerificationData } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Mail, Shield } from "lucide-react";

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    email: string;
    fullName?: string;
    isOnboarded: boolean;
  };
}

export default function AuthPage() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  // Get plan from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const planType = urlParams.get('plan') || 'starter';
  const planName = getPlanName(planType);

  const emailForm = useForm<AuthData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
    },
  });

  const otpForm = useForm<OtpVerificationData>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      email: '',
      code: '',
    },
  });

  const sendOtpMutation = useMutation({
    mutationFn: (data: AuthData) => apiRequest('/api/auth/send-otp', 'POST', data),
    onSuccess: () => {
      toast({
        title: "OTP Sent",
        description: "Please check your email for the 6-digit verification code.",
      });
      setStep('otp');
      otpForm.setValue('email', email);
    },
    onError: (error: any) => {
      console.error('Send OTP error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (data: OtpVerificationData) => apiRequest('/api/auth/verify-otp', 'POST', data),
    onSuccess: (data: AuthResponse) => {
      if (data.success && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        toast({
          title: "Welcome!",
          description: "You've been successfully authenticated.",
        });

        // Navigate based on onboarding status
        if (data.user?.isOnboarded) {
          navigate(`/cart?plan=${planType}`);
        } else {
          navigate(`/onboarding?plan=${planType}`);
        }
      }
    },
    onError: (error: any) => {
      console.error('Verify OTP error:', error);
      toast({
        title: "Error",
        description: error.message || "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onEmailSubmit = (data: AuthData) => {
    setEmail(data.email);
    sendOtpMutation.mutate(data);
  };

  const onOtpSubmit = (data: OtpVerificationData) => {
    verifyOtpMutation.mutate(data);
  };

  const handleResendOtp = () => {
    if (email) {
      sendOtpMutation.mutate({ email });
    } else {
      toast({
        title: "Error",
        description: "Please enter your email first.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-green-900/10" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Aeonark Labs</h1>
          <p className="text-gray-400">Welcome to the future of digital solutions</p>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {step === 'email' ? 'Get Started' : 'Enter Verification Code'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {step === 'email' 
                ? `Continue with your email to access ${planName}` 
                : 'We sent a 6-digit code to your email'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800 mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-green-600">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-blue-600">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                {step === 'email' ? (
                  <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                      <FormField
                        control={emailForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Enter your email"
                                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        disabled={sendOtpMutation.isPending}
                      >
                        {sendOtpMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending Code...
                          </>
                        ) : (
                          'Send Verification Code'
                        )}
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                      <div className="text-center mb-4">
                        <Shield className="mx-auto h-12 w-12 text-green-500 mb-2" />
                        <p className="text-sm text-gray-400">
                          Code sent to <span className="text-green-400">{email}</span>
                        </p>
                      </div>
                      
                      <FormField
                        control={otpForm.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">6-Digit Code</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="123456"
                                maxLength={6}
                                className="text-center text-2xl font-mono bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        disabled={verifyOtpMutation.isPending}
                      >
                        {verifyOtpMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          'Verify & Continue'
                        )}
                      </Button>
                      
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                          disabled={sendOtpMutation.isPending}
                        >
                          Didn't receive code? Resend
                        </button>
                      </div>
                    </form>
                  </Form>
                )}
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                {/* Same form for signup since it's OTP-based */}
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-400">
                    No difference between login and signup - we'll create your account automatically when you verify your email.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
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