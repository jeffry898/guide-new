import { Suspense } from 'react';
import ReportClient from './ReportClient';

export function generateStaticParams() {
  return [{ token: ['index'] }];
}

export default function RiskReportResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0F1E]" />}>
      <ReportClient />
    </Suspense>
  );
}
