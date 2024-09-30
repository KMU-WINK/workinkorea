export interface UserDetail {
  user: {
    profile_picture_base64: string;
    id: number;
    social_id: string;
    birth: string;
    social: string;
    nickname: string;
    gender: string;
  };
  regions: string[] | null;
  interests: string[] | null;
  works: string[] | null;
}

export interface CreateUserNicknameProps {
  social_id: string | null;
  nickname: string;
}

export interface CreateUserInfoProps {
  social_id: string | null;
  birth: string | undefined;
  gender: string;
}

export interface CreateUserRegionProps {
  social_id: string | null;
  regions: [string | null];
}

export interface CreateUserWorkProps {
  social_id: string | null;
  works: string[];
}

export interface CreateUserInterestProps {
  social_id: string | null;
  interests: string[];
}
