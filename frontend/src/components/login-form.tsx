'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

type Props = {}

function LoginForm({ }: Props) {

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Usuario precisa de no minimo 2 caracteres",
        }).max(50),
        password: z.string().min(5, {
            message: "precisa de pelo menos 5 digitos"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const router = useRouter()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append("username", values.username)
        formData.append("password", values.password)

        const requestOptions = {
            method: 'POST',
            body: formData,
        }

        const response = await fetch("http://localhost:8080/login", requestOptions);
        if (response.ok) {
            console.log(response)
            alert('Autenticado')
            router.push('/dashboard')
        }
        else {
            console.error(response)
            alert('Falha ao autenticar')
        }
    }

    return (
        <Form {...form}>
            <h3>Login no Sistema</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                <FormDescription>
                    Formulario para entrar no sistema
                </FormDescription>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => {
                        return <FormItem>
                            <FormLabel>Usuário</FormLabel>
                            <FormControl>
                                <Input placeholder="usuario" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>;
                    }}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => {
                        return <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="senha" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>;
                    }}
                />
                <Button type='submit'>Entrar</Button>

            </form>
        </Form>
    )
}

export default LoginForm