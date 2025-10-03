import { z } from 'zod';

// Pet creation validation schema
export const petSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  
  species: z.string()
    .trim()
    .max(50, "A espécie deve ter no máximo 50 caracteres")
    .optional(),
  
  breed: z.string()
    .trim()
    .max(100, "A raça deve ter no máximo 100 caracteres")
    .optional(),
  
  location: z.string()
    .trim()
    .max(200, "A localização deve ter no máximo 200 caracteres")
    .optional(),
  
  description: z.string()
    .trim()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .optional(),
  
  story: z.string()
    .trim()
    .max(5000, "A história deve ter no máximo 5000 caracteres")
    .optional(),
  
  birth_date: z.string()
    .refine((date) => {
      if (!date) return true;
      return new Date(date) <= new Date();
    }, "A data de nascimento não pode ser no futuro")
    .optional(),
  
  death_date: z.string().optional(),
  
  is_deceased: z.boolean(),
}).refine((data) => {
  if (data.birth_date && data.death_date) {
    return new Date(data.death_date) >= new Date(data.birth_date);
  }
  return true;
}, {
  message: "A data de falecimento deve ser posterior à data de nascimento",
  path: ["death_date"]
});

// Memory creation validation schema
export const memorySchema = z.object({
  title: z.string()
    .trim()
    .min(1, "O título é obrigatório")
    .max(200, "O título deve ter no máximo 200 caracteres"),
  
  content: z.string()
    .trim()
    .max(5000, "O conteúdo deve ter no máximo 5000 caracteres")
    .optional(),
  
  memory_date: z.string()
    .min(1, "A data da memória é obrigatória"),
  
  media_type: z.enum(['photo', 'video', 'audio']).optional(),
});

// Auth validation schemas
export const signUpSchema = z.object({
  email: z.string()
    .trim()
    .email("Email inválido")
    .max(255, "O email deve ter no máximo 255 caracteres"),
  
  password: z.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(72, "A senha deve ter no máximo 72 caracteres"),
  
  displayName: z.string()
    .trim()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
});

export const signInSchema = z.object({
  email: z.string()
    .trim()
    .email("Email inválido")
    .max(255, "O email deve ter no máximo 255 caracteres"),
  
  password: z.string()
    .min(1, "A senha é obrigatória"),
});

export type PetFormData = z.infer<typeof petSchema>;
export type MemoryFormData = z.infer<typeof memorySchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
