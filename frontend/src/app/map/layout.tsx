import { ReactNode, Suspense } from 'react';

interface MapLayoutProps {
  children: ReactNode;
}

export default function MapLayout({ children }: MapLayoutProps) {
  return <Suspense>{children}</Suspense>;
}
