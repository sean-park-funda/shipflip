import { createClient } from "@/lib/supabase/server";
import { HeaderClient } from "./header-client";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const serializedUser = user
    ? {
        id: user.id,
        email: user.email ?? null,
        user_metadata: user.user_metadata,
      }
    : null;

  return <HeaderClient user={serializedUser} />;
}
