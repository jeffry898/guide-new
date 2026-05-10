import GuideClient from './GuideClient';

export function generateStaticParams() {
  return [{ id: ['index'] }];
}

export default function GuidePage() {
  return <GuideClient />;
}
