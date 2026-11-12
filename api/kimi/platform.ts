// Thin client for the Kimi Open Platform userinfo endpoint.

import { env } from "../lib/env";
import type { UserProfile } from "../types";

export const users = {
  async getProfile(accessToken: string): Promise<UserProfile | null> {
    try {
      const resp = await fetch(`${env.kimiOpenUrl}/api/user/info`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!resp.ok) {
        console.error("[platform] getProfile failed:", resp.status);
        return null;
      }
      const data = await resp.json() as {
        user_id?: string;
        union_id?: string;
        name?: string;
        email?: string;
        avatar_url?: string;
        avatar?: string;
      };
      return {
        user_id: data.user_id ?? data.union_id ?? "",
        name: data.name ?? "User",
        email: data.email,
        avatar_url: data.avatar_url ?? data.avatar,
      };
    } catch (error) {
      console.error("[platform] getProfile error:", error);
      return null;
    }
  },
};
