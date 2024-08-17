export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  location?: string;
  joined_on: Date;
  created_at: Date;
  updated_at: Date;
  image?: string;
  compressed_image?: string;
  bio?: string;
  dob?: Date;
  sex?: string;
  looking_for: string[];
  life_state: string[];
  google_id?: string;
  Event: Event[];
  password_reset_tokens?: PasswordResetToken;
  events?: UserEvent;
  groups?: UserGroup;
  interests: UserInterest[];
  refresh_token: string[];
};

export type PasswordResetToken = {
  user_id: string;
  token: string;
  token_expiry: Date;
  user: User;
};

export type Group = {
  id: string;
  name: string;
  group_type?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  organized_by: string;
  about?: string;
  created_at: Date;
  updated_at: Date;
  image?: string;
  compressed_image?: string;
  events: Event[];
  users: UserGroup;
  deletion_request_date?: Date;
};
export type Event = {
  id: string;
  name: string;
  image?: string;
  compressed_image?: string;
  details?: string;
  host_id: string;
  group_id: string;
  event_date: Date;
  event_time: Date;
  event_end_time: Date;
  latitude?: number;
  longitude?: number;
  event_type: string;
  link?: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
  group: Group;
  host: User;
  tags: Interest[];
  user_events?: UserEvent;
};

export type Category = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  CategoryInterest?: CategoryInterest;
  interests: Interest[];
};

type Interest = {
  id: string;
  name: string;
  category_id: string;
  created_at: Date;
  updated_at: Date;
  CategoryInterest?: CategoryInterest;
  category: Category;
  users: UserInterest[];
  events: Event[];
};

export type UserInterest = {
  user_id: string;
  interest_id: string;
  created_at: Date;
  updated_at: Date;
  user: User;
  interest: Interest;
};
export type UserGroup = {
  user_id: string;
  group_id: string;
  created_at: Date;
  updated_at: Date;
  group: Group;
  user: User;
};

export type UserEvent = {
  user_id: string;
  event_id: string;
  created_at: Date;
  updated_at: Date;
  event: Event;
  user: User;
};

export type CategoryInterest = {
  category_id: string;
  interest_id: string;
  created_at: Date;
  updated_at: Date;
  category: Category;
  interest: Interest;
};
