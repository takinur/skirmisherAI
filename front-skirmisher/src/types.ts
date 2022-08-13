type DateTime = string;
export type Nullable<T> = T | null;

export interface Iuser {
  id: number;
  name: string;
}
export interface Iuser2 {
  id: number;
  name: string;
  email: string;
  current_team_id: Nullable<number>;
  profile_photo_path: Nullable<string>;
  profile_photo_url: string;
  two_factor_enabled: boolean;
  email_verified_at: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface IAuthContext {
    auth: Iuser;
    setAuth: (auth: Iuser) => void;
}

export interface Role {
  key: string;
  name: string;
  permissions: string[];
  description: string;
}
