import { supabase } from "./supabase";

export async function requireUserId(): Promise<string> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Neprisijungęs vartotojas");
  }

  return user.id;
}
