import OnboardingClient from './OnboardingClient';

export function generateStaticParams() {
  return [{ session: [] }];
}

export default function OnboardingPage() {
  return <OnboardingClient />;
}
