import PublicAxiosInstance from '@/services/publicAxiosInstance';
import {
  CreateUserInfoProps,
  CreateUserInterestProps,
  CreateUserNicknameProps,
  CreateUserRegionProps,
  CreateUserWorkProps,
} from '@/types/user';
import PrivateAxiosInstance from '@/services/privateAxiosInstance';

const getUserDetail = async (socialId: string) => {
  try {
    const response = await PrivateAxiosInstance.get(
      `/users/detail/${socialId}`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const createUserNickname = async ({
  social_id,
  nickname,
}: CreateUserNicknameProps) => {
  await PublicAxiosInstance.patch('/users/nickname', {
    social_id,
    nickname,
  });
};

const createUserInfo = async ({
  social_id,
  birth,
  gender,
}: CreateUserInfoProps) => {
  await PublicAxiosInstance.patch('/users/info', {
    social_id,
    birth,
    gender,
  });
};

const createUserRegion = async ({
  social_id,
  regions,
}: CreateUserRegionProps) => {
  await PublicAxiosInstance.patch('/users/region', {
    social_id,
    regions,
  });
};

const createUserWork = async ({ social_id, works }: CreateUserWorkProps) => {
  await PublicAxiosInstance.patch('/users/work', {
    social_id,
    works,
  });
};

const createUserInterest = async ({
  social_id,
  interests,
}: CreateUserInterestProps) => {
  await PublicAxiosInstance.patch('/users/interest', {
    social_id,
    interests,
  });
};

export {
  createUserNickname,
  createUserInfo,
  createUserRegion,
  createUserWork,
  createUserInterest,
  getUserDetail,
};
