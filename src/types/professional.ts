export interface Litter {
  id: string;
  breeder_id: string;
  sire_id?: string;
  dam_id?: string;
  birth_date: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface HealthRecord {
  id: string;
  pet_id: string;
  record_type: 'vaccination' | 'deworming' | 'treatment' | string;
  record_date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
