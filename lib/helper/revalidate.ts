"use server";

import { revalidatePath } from "next/cache";

export const revalidateOwnTeamData = async () => {
  revalidatePath("/teams/own");
};

export const revalidateLayout = async () => {
  revalidatePath("/");
};
