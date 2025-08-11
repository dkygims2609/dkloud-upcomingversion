export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ai_tools: {
        Row: {
          Category: string
          "EstimatedCost/Permonth": string | null
          id: string
          Pricingmodel: string | null
          Purpose: string | null
          Toolname: string
          ToolsLink: string | null
        }
        Insert: {
          Category: string
          "EstimatedCost/Permonth"?: string | null
          id?: string
          Pricingmodel?: string | null
          Purpose?: string | null
          Toolname: string
          ToolsLink?: string | null
        }
        Update: {
          Category?: string
          "EstimatedCost/Permonth"?: string | null
          id?: string
          Pricingmodel?: string | null
          Purpose?: string | null
          Toolname?: string
          ToolsLink?: string | null
        }
        Relationships: []
      }
      banner_content: {
        Row: {
          content: string
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_sections: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          section_name: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          section_name: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          section_name?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      gem_websites: {
        Row: {
          Category: string | null
          id: string
          Purpose: string | null
          Website: string
        }
        Insert: {
          Category?: string | null
          id?: string
          Purpose?: string | null
          Website: string
        }
        Update: {
          Category?: string | null
          id?: string
          Purpose?: string | null
          Website?: string
        }
        Relationships: []
      }
      Movies: {
        Row: {
          Achievements: string | null
          Awards: string | null
          Director: string | null
          DKcloudRating: string | null
          Genre: string | null
          id: number
          Language: string | null
          Name: string
          Platform: string | null
          Why2Watch: string | null
          Year: string | null
        }
        Insert: {
          Achievements?: string | null
          Awards?: string | null
          Director?: string | null
          DKcloudRating?: string | null
          Genre?: string | null
          id?: number
          Language?: string | null
          Name: string
          Platform?: string | null
          Why2Watch?: string | null
          Year?: string | null
        }
        Update: {
          Achievements?: string | null
          Awards?: string | null
          Director?: string | null
          DKcloudRating?: string | null
          Genre?: string | null
          id?: number
          Language?: string | null
          Name?: string
          Platform?: string | null
          Why2Watch?: string | null
          Year?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rss_feeds: {
        Row: {
          category: string
          created_at: string
          feed_url: string
          id: string
          is_active: boolean | null
          last_fetched: string | null
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          feed_url: string
          id?: string
          is_active?: boolean | null
          last_fetched?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          feed_url?: string
          id?: string
          is_active?: boolean | null
          last_fetched?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      smart_gadgets: {
        Row: {
          affiliate_url: string | null
          availability_india: boolean | null
          brand: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price_inr: number | null
          price_usd: number | null
          product_url: string | null
          rating: number | null
          release_date: string | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          affiliate_url?: string | null
          availability_india?: boolean | null
          brand?: string | null
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price_inr?: number | null
          price_usd?: number | null
          product_url?: string | null
          rating?: number | null
          release_date?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          affiliate_url?: string | null
          availability_india?: boolean | null
          brand?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price_inr?: number | null
          price_usd?: number | null
          product_url?: string | null
          rating?: number | null
          release_date?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      tech_news: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          published_date: string
          source: string
          tags: string[] | null
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          published_date: string
          source: string
          tags?: string[] | null
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          published_date?: string
          source?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      TvSeries: {
        Row: {
          Achievements: string | null
          Awards: string | null
          DKcloudRating: string | null
          Genre: string | null
          id: number
          Language: string | null
          Name: string
          Platform: string | null
          Why2Watch: string | null
          Year: string | null
        }
        Insert: {
          Achievements?: string | null
          Awards?: string | null
          DKcloudRating?: string | null
          Genre?: string | null
          id?: number
          Language?: string | null
          Name: string
          Platform?: string | null
          Why2Watch?: string | null
          Year?: string | null
        }
        Update: {
          Achievements?: string | null
          Awards?: string | null
          DKcloudRating?: string | null
          Genre?: string | null
          id?: number
          Language?: string | null
          Name?: string
          Platform?: string | null
          Why2Watch?: string | null
          Year?: string | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
