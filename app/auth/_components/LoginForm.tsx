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
import type { LoginFormType } from "@/lib/types";
import { loginSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const LoginForm = () => {
  const params = useSearchParams();
  const error = params.get("error");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormType) => {
    startTransition(async () => {
      await signIn("credentials", values);
      router.push("/teams/own");
    });
  };

  return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
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
          {error === "CredentialsSignin" && (
            <ErrorMessage message={"Invalid credentials"} />
          )}

          {isPending ? <LoadingButton /> : <Button>Login</Button>}
        </form>
      </Form>
  );
};

export default LoginForm;
