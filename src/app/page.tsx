import { ResourceLinks } from '@/components/features/resource-links';
import { WelcomeSection } from '@/components/features/welcome-section';
import { Header } from '@/components/layout/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <WelcomeSection />

        <ResourceLinks />

        <p className="text-center text-sm text-muted-foreground mt-12">
          الرجاء الدعاء لكل من ساهم في هذا العمل.
        </p>
      </main>
    </div>
  );
}
