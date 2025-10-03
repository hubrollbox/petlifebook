// Core database types
export interface Pet {
  id: string;
  owner_id: string;
  name: string;
  species?: string;
  breed?: string;
  birth_date?: string;
  death_date?: string;
  location?: string;
  description?: string;
  story?: string;
  profile_image_url?: string;
  is_deceased: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface Memory {
  id: string;
  pet_id: string;
  user_id: string;
  title: string;
  content?: string;
  memory_date: string;
  media_url?: string;
  media_type?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  display_name?: string;
  email?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_type: 'free' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}
