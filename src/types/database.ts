/**
 * Database types for the TBSF CMS.
 *
 * Hand-maintained to match supabase/migrations/. If the schema changes,
 * update this file in the same commit — nothing regenerates it.
 */

export type EventStatus = 'past' | 'upcoming';
export type TeamCategory = 'founder' | 'core';
export type WinnerPosition = 'winner' | 'runner_up' | 'third' | 'special';
export type ApplicationStatus = 'new' | 'reviewing' | 'accepted' | 'rejected';
export type MemberStatus = 'active' | 'inactive' | 'alumni';
export type UserRole = 'admin' | 'viewer';

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

export type EventRecord = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  status: EventStatus;
  starts_on: string | null;
  ends_on: string | null;
  location: string | null;
  image_path: string | null;
  registration_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  year: number;
  category: TeamCategory;
  image_path: string | null;
  bio: string | null;
  focus: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type SportifyWinner = {
  id: string;
  edition_year: number;
  sport: string;
  position: WinnerPosition;
  team_name: string | null;
  player_names: string | null;
  award_title: string | null;
  image_path: string | null;
  notes: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  education: string | null;
  experience: string | null;
  skills: string;
  motivation: string;
  status: ApplicationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

/** Mirrors the TBSF Google Form workbook columns. Contains PII. */
export type Member = {
  id: string;
  submitted_at: string | null;
  email: string;
  full_name: string;
  contact_no: string | null;
  education: string | null;
  occupation: string | null;
  blood_group: string | null;
  dob: string | null;
  photo_url: string | null;
  registration_fee_proof_url: string | null;
  tshirt_fee_proof_url: string | null;
  needs_tshirt: boolean | null;
  tshirt_size: string | null;
  referred_by: string | null;
  hobbies: string | null;
  departments: string[];
  message: string | null;
  ice_breaker: string | null;
  source_tab: string | null;
  status: MemberStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

type Writable<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'> & { created_at?: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      events: {
        Row: EventRecord;
        Insert: Partial<Writable<EventRecord>> & Pick<EventRecord, 'slug' | 'title'>;
        Update: Partial<Writable<EventRecord>>;
        Relationships: [];
      };
      team_members: {
        Row: TeamMember;
        Insert: Partial<Writable<TeamMember>> & Pick<TeamMember, 'name' | 'role' | 'year'>;
        Update: Partial<Writable<TeamMember>>;
        Relationships: [];
      };
      sportify_winners: {
        Row: SportifyWinner;
        Insert: Partial<Writable<SportifyWinner>> &
          Pick<SportifyWinner, 'edition_year' | 'sport'>;
        Update: Partial<Writable<SportifyWinner>>;
        Relationships: [];
      };
      applications: {
        Row: Application;
        Insert: Partial<Writable<Application>> &
          Pick<Application, 'name' | 'email' | 'phone' | 'skills' | 'motivation'>;
        Update: Partial<Writable<Application>>;
        Relationships: [];
      };
      members: {
        Row: Member;
        Insert: Partial<Writable<Member>> & Pick<Member, 'email' | 'full_name'>;
        Update: Partial<Writable<Member>>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}

/**
 * Departments offered on the TBSF membership form, ordered by how many
 * registrants chose each one. Derived from the workbook, not invented.
 */
export const DEPARTMENTS = [
  'Management',
  'Public Relations',
  'Photography',
  'Content Developer',
  'Graphics Designer',
  'Documentation',
  'Video Editing',
  'Disciplinary',
  'Sponsorship',
  'Videography',
] as const;
