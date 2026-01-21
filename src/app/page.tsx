import { DailyReflection } from '@/components/features/daily-reflection';
import { GoalTracker } from '@/components/features/goal-tracker';
import { ProgressChart } from '@/components/features/progress-chart';
import { ResourceLinks } from '@/components/features/resource-links';
import { Header } from '@/components/layout/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="space-y-8">
          <ResourceLinks />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <DailyReflection />
            </div>
            <div className="space-y-8">
              <GoalTracker />
              <ProgressChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
