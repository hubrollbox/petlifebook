-- Adicionar tipo de utilizador e informações de negócio à tabela profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'individual' NOT NULL,
ADD COLUMN IF NOT EXISTS business_name TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS contact_email TEXT;

-- Adicionar status e litter_id à tabela pets
ALTER TABLE pets
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'personal' NOT NULL,
ADD COLUMN IF NOT EXISTS litter_id UUID;

-- Criar a tabela litters
CREATE TABLE IF NOT EXISTS litters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    breeder_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    sire_id UUID REFERENCES pets(id) ON DELETE SET NULL,
    dam_id UUID REFERENCES pets(id) ON DELETE SET NULL,
    birth_date DATE NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Adicionar chave estrangeira para litter_id na tabela pets
ALTER TABLE pets
ADD CONSTRAINT fk_litter
FOREIGN KEY (litter_id)
REFERENCES litters(id)
ON DELETE SET NULL;

-- Criar a tabela health_records
CREATE TABLE IF NOT EXISTS health_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
    record_type TEXT NOT NULL,
    record_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Adicionar RLS para a nova tabela litters
ALTER TABLE litters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Litters are visible to their breeder" ON litters
  FOR SELECT USING (auth.uid() = breeder_id);

CREATE POLICY "Breeders can insert their own litters" ON litters
  FOR INSERT WITH CHECK (auth.uid() = breeder_id);

CREATE POLICY "Breeders can update their own litters" ON litters
  FOR UPDATE USING (auth.uid() = breeder_id);

CREATE POLICY "Breeders can delete their own litters" ON litters
  FOR DELETE USING (auth.uid() = breeder_id);

-- Adicionar RLS para a nova tabela health_records
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Health records are visible to pet owner" ON health_records
  FOR SELECT USING (EXISTS (SELECT 1 FROM pets WHERE pets.id = health_records.pet_id AND pets.owner_id = auth.uid()));

CREATE POLICY "Pet owners can insert health records for their pets" ON health_records
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM pets WHERE pets.id = health_records.pet_id AND pets.owner_id = auth.uid()));

CREATE POLICY "Pet owners can update health records for their pets" ON health_records
  FOR UPDATE USING (EXISTS (SELECT 1 FROM pets WHERE pets.id = health_records.pet_id AND pets.owner_id = auth.uid()));

CREATE POLICY "Pet owners can delete health records for their pets" ON health_records
  FOR DELETE USING (EXISTS (SELECT 1 FROM pets WHERE pets.id = health_records.pet_id AND pets.owner_id = auth.uid()));

-- Trigger para atualizar updated_at nas novas tabelas
CREATE TRIGGER update_litters_updated_at
BEFORE UPDATE ON litters
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_records_updated_at
BEFORE UPDATE ON health_records
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();