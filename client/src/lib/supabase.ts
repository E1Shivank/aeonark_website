import { createClient } from '@supabase/supabase-js'

// Fix URL format - add protocol if missing
const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'placeholder.supabase.co';
const supabaseUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company: string | null
          primary_goal: string | null
          build_goal: string | null
          is_onboarded: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          company?: string | null
          primary_goal?: string | null
          build_goal?: string | null
          is_onboarded?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company?: string | null
          primary_goal?: string | null
          build_goal?: string | null
          is_onboarded?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: number
          user_id: string
          plan_type: string
          plan_name: string
          add_ons: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          plan_type: string
          plan_name: string
          add_ons?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          plan_type?: string
          plan_name?: string
          add_ons?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}