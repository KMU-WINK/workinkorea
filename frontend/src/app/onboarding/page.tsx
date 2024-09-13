import { UserDetailResponse } from '@/types/type';
import { redirect } from 'next/navigation';

interface IContext {
  searchParams: {
    social_id: string | undefined;
    provider: string | undefined;
  };
}

async function getUserDetail(social_id: string): Promise<UserDetailResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/users/detail/${social_id}`,
    { cache: 'no-store' }, // 최신 데이터를 받기 위해 캐싱 비활성화
  );

  if (!res.ok) {
    // 회원이 db에 없는 경우에는 statusCode를 다르게 받아오는 등의 수정이 필요함.
    // 단순 API 요청 실패와 사용자 없음을 구분할 필요가 있음.
    redirect('/main');
  }

  return res.json();
}

export default async function Onboarding(context: IContext) {
  // social_id가 없는 경우 /main으로 리다이렉트
  const socialId = context.searchParams.social_id;
  const provider = context.searchParams.provider;

  if (!(socialId && provider)) {
    redirect('/main');
  }

  const userDetail = await getUserDetail(socialId);

  // TODO: searchParam은 유지하도록 수정해야함
  if (!userDetail.user.nickname) redirect('/onboarding/step1');
  if (!userDetail.user.birth || !userDetail.user.gender)
    redirect('/onboarding/step2');
  if (!userDetail.regions) redirect('/onboarding/step3');
  if (!userDetail.works) redirect('/onboarding/step4');
  if (!userDetail.interests) redirect('/onboarding/step5');

  return <></>;
}
