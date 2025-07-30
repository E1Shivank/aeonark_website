import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailCheckSchema, otpVerificationSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Shield, ArrowLeft, CheckCircle } from "lucide-react";
import { authService } from "@/lib/auth";
import { z } from "zod";

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

export default function NewAuthPage() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const { toast } = useToast();

  // Get plan from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const planType = urlParams.get('plan') || 'starter';

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        const user = authService.getCurrentUser();
        if (user) {
          if (user.isOnboarded) {
            navigate(`/cart?plan=${planType}`);
          } else {
            navigate(`/onboarding?plan=${planType}`);
          }
        }
      }
    };
    checkAuth();
  }, [navigate, planType]);

  // Initialize Supabase session
  useEffect(() => {
    authService.initializeSupabaseSession();
  }, []);

  const emailForm = useForm<z.infer<typeof emailCheckSchema>>({
    resolver: zodResolver(emailCheckSchema),
    defaultValues: {
      email: '',
    },
  });

  const otpForm = useForm<z.infer<typeof otpVerificationSchema>>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      email: '',
      code: '',
    },
  });

  // Check email and determine signup vs login flow
  const checkEmailMutation = useMutation({
    mutationFn: async (data: z.infer<typeof emailCheckSchema>) => {
      return authService.checkEmail(data.email);
    },
    onSuccess: (data, variables) => {
      setEmail(variables.email);
      setIsOnboarded(data.isOnboarded);
      
      if (data.exists) {
        setAuthMode('login');
        // Automatically send login OTP
        sendLoginOtp(variables.email);
      } else {
        setAuthMode('signup');
        // Automatically send signup OTP
        sendSignupOtp(variables.email);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to check email. Please try again.",
        variant: "destructive",
      });
    },
  });

  const sendSignupOtp = async (email: string) => {
    try {
      await authService.signup(email);
      toast({
        title: "Welcome to Aeonark Labs!",
        description: "We've sent a verification code to your email. Please check your inbox.",
      });
      setStep('otp');
      otpForm.setValue('email', email);
    } catch (error: any) {
      if (error.message.includes('email send rate limit') || error.message.includes('60 seconds')) {
        toast({
          title: "Rate Limited",
          description: "Please wait 60 seconds before requesting another code.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to send signup code. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const sendLoginOtp = async (email: string) => {
    try {
      const result = await authService.login(email);
      setIsOnboarded(result.isOnboarded);
      toast({
        title: "Welcome back!",
        description: "We've sent a login code to your email. Please check your inbox.",
      });
      setStep('otp');
      otpForm.setValue('email', email);
    } catch (error: any) {
      if (error.message.includes('email send rate limit') || error.message.includes('60 seconds')) {
        toast({
          title: "Rate Limited",
          description: "Please wait 60 seconds before requesting another code.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to send login code. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: z.infer<typeof otpVerificationSchema>) => {
      return authService.verifyOtp(data.email, data.code);
    },
    onSuccess: (data) => {
      authService.storeSession(data);
      
      toast({
        title: "Success!",
        description: authMode === 'signup' ? "Account created successfully!" : "Welcome back!",
      });

      // Navigate based on onboarding status
      if (data.user.isOnboarded) {
        navigate(`/cart?plan=${planType}`);
      } else {
        navigate(`/onboarding?plan=${planType}`);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Invalid or expired code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEmailSubmit = (data: z.infer<typeof emailCheckSchema>) => {
    checkEmailMutation.mutate(data);
  };

  const handleOtpSubmit = (data: z.infer<typeof otpVerificationSchema>) => {
    verifyOtpMutation.mutate(data);
  };

  const handleResendOtp = async () => {
    try {
      if (authMode === 'signup') {
        await sendSignupOtp(email);
      } else {
        await sendLoginOtp(email);
      }
    } catch (error: any) {
      // Error handling is already done in sendSignupOtp/sendLoginOtp
    }
  };

  const goBack = () => {
    setStep('email');
    setEmail('');
    setAuthMode('signup');
    emailForm.reset();
    otpForm.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <TwinklingStars />
      
      <div className="w-full max-w-md relative z-10">
        <Card className="bg-gray-900/95 border-gray-800 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              {step === 'email' ? 'Continue to Aeonark Labs' : 
               authMode === 'signup' ? 'Verify Your Email' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {step === 'email' ? 'Enter your email to get started' : 
               `Enter the 6-digit code sent to ${email}`}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 'email' ? (
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    disabled={checkEmailMutation.isPending}
                  >
                    {checkEmailMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={goBack}
                    className="text-gray-400 hover:text-white p-0 h-auto"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{authMode === 'signup' ? 'Signing up' : 'Logging in'}</span>
                  </div>
                </div>
                
                <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-4">
                    <FormField
                      control={otpForm.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Verification Code</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                type="text"
                                placeholder="000000"
                                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500 text-center text-lg tracking-wider"
                                maxLength={6}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      disabled={verifyOtpMutation.isPending}
                    >
                      {verifyOtpMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        authMode === 'signup' ? 'Create Account' : 'Sign In'
                      )}
                    </Button>
                  </form>
                </Form>
                
                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={handleResendOtp}
                    className="text-gray-400 hover:text-white text-sm"
                    disabled={checkEmailMutation.isPending}
                  >
                    {checkEmailMutation.isPending ? "Sending..." : "Didn't receive the code? Resend"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
}