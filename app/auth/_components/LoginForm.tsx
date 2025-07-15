"use client";

import LoadingButton from "@/components/General/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth.actions";
import type { LoginFormType } from "@/lib/types";
import { loginSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import SuccessMessage from "./SuccessMessage";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const { update } = useSession();
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormType) => {
    setSuccess(null);
    setError(null);
    const result = await login(values);
    console.log('logged in')
    if (result.success) await update();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}

        {form.formState.isSubmitting ? (
          <LoadingButton />
        ) : (
          <Button disabled={form.formState.isSubmitting}>Login</Button>
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
