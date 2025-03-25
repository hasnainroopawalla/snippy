import {
  Session as SupabaseSession,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";

export class AuthService {
  private supabaseClient: SupabaseClient;

  constructor(props: { supabaseClient: SupabaseClient }) {
    this.supabaseClient = props.supabaseClient;
  }

  public async createAnonymousUser(): Promise<{
    user: User | null;
    session: SupabaseSession | null;
  }> {
    return this.supabaseClient.auth
      .signInAnonymously()
      .then(({ data, error }) => {
        if (error) {
          throw new Error("Failed to initialize Core.");
        }
        return data;
      });
  }

  public async getSession(): Promise<SupabaseSession | null> {
    return this.supabaseClient.auth
      .getSession()
      .then(({ data }) => data.session ?? null);
  }
}
