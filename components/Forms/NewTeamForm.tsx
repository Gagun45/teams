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
import type { NewTeamType } from "@/lib/types";
import { newTeamSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ErrorMessage from "@/app/auth/_components/ErrorMessage";
import SuccessMessage from "@/app/auth/_components/SuccessMessage";
import { createNewTeam } from "@/lib/actions/team.actions";

const NewTeamForm = () => {
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  const form = useForm<NewTeamType>({
    resolver: zodResolver(newTeamSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: NewTeamType) => {
    setSuccess(null);
    setError(null);
    const result = await createNewTeam(values);
    setError(result?.error);
    setSuccess(result?.success);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team name</FormLabel>
              <FormControl>
                <Input placeholder="Team Name" {...field} />
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
          <Button disabled={form.formState.isSubmitting}>Create a team</Button>
        )}
      </form>
    </Form>
  );
};

export default NewTeamForm;
