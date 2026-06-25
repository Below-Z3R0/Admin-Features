import z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, { error: 'El nombre debe de tener al menos 3 caracteres' }),
    email: z
        .email({ error: 'El formato del correo no es válido' }),
    password: z
        .string()
        .min(6, { error: 'La contraseña debe tener al menos 6 caracteres' }),
    confirmpassword: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
}).refine((values) => values.password === values.confirmpassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmpassword"]
});
export const signInSchema = z.object({
    email: z
        .email({ error: 'El formato del correo no es válido' }),
    password: z
        .string()
        .min(6, { error: 'La contraseña debe tener al menos 6 caracteres' })
});
export type signUp = z.infer<typeof signUpSchema>;
export type signIn = z.infer<typeof signInSchema>;