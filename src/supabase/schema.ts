export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cart_items: {
        Row: {
          product_id: number;
          quantity: number;
          user_id: string;
        };
        Insert: {
          product_id: number;
          quantity: number;
          user_id: string;
        };
        Update: {
          product_id?: number;
          quantity?: number;
          user_id?: string;
        };
      };
      products: {
        Row: {
          category: string;
          description: string;
          id: number;
          image: string;
          price: number;
          title: string;
        };
        Insert: {
          category: string;
          description: string;
          id?: number;
          image: string;
          price: number;
          title: string;
        };
        Update: {
          category?: string;
          description?: string;
          id?: number;
          image?: string;
          price?: number;
          title?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      add_to_cart: {
        Args: {
          product: number;
          amount: number;
        };
        Returns: undefined;
      };
      update_cart_quantity: {
        Args: {
          product: number;
          new_quantity: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
