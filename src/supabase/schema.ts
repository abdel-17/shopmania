export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          category: string
          description: string
          id: number
          image: string
          price: number
          title: string
        }
        Insert: {
          category: string
          description: string
          id?: number
          image: string
          price: number
          title: string
        }
        Update: {
          category?: string
          description?: string
          id?: number
          image?: string
          price?: number
          title?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
