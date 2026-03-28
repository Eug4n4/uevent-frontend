export interface AccountAttributes {
  role: string;
  email: string;
  updated_at: string;
  created_at: string;
}

export interface AccountRelationships {
  profile: {
    data: {
      id: string;
      type: "profile";
    };
  };
}
