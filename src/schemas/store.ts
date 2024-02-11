import { minLength, object, optional, string } from 'valibot';

export const storeFormSchema = object({
    id: optional(string()),
    name: string([minLength(1, 'El nombre es requerido.'),]),
    description: string([minLength(1, 'La descripción es requerida.'),]),
});

