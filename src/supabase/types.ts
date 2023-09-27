export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_items_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [];
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
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
