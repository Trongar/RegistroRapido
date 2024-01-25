import { object, string, minLength } from 'valibot';

export const storeFormSchema = object({
    id: string([minLength(1, 'El id es requerido.'),]),
    name: string([minLength(1, 'El nombre es requerido.'),]),
    description: string([minLength(1, 'La descripción es requerida.'),]),
});

