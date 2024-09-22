import { ReactNode, Suspense } from 'react';

interface OnboardingLayoutProps {
  children: ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return <Suspense>{children}</Suspense>;
}
