'use client';

import { ResourceLinks } from '@/components/features/resource-links';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2 } from 'lucide-react';
import { DailyReflection } from '@/components/features/daily-reflection';
import { GoalTracker } from '@/components/features/goal-tracker';
import { ProgressChart } from '@/components/features/progress-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const { toast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'تم نسخ الرابط!',
        description: 'تم نسخ رابط الصفحة إلى الحافظة.',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold font-headline">دفتر رمضان</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            رمضان فرصة ثمينة للتقرب إلى الله وإعادة ترتيب حياتنا. هذا الدفتر
            مصمم لمساعدتك على الالتزام بهدوء وسكينة، يومًا بعد يوم، وخطوة
            بخطوة، بلا ضغط أو تعقيدات. نسأل الله أن يوفقك ويتقبل منك.
          </p>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="ml-2 h-4 w-4" />
            مشاركة الصفحة
          </Button>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">لوحة المتابعة</TabsTrigger>
            <TabsTrigger value="resources">روابط ومصادر</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <div className="grid gap-6 mt-6 md:grid-cols-1 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <DailyReflection />
              </div>
              <GoalTracker />
              <ProgressChart />
            </div>
          </TabsContent>
          <TabsContent value="resources">
            <div className="mt-6">
              <ResourceLinks />
            </div>
          </TabsContent>
        </Tabs>

        <p className="text-center text-sm text-muted-foreground mt-8">
          الرجاء الدعاء لكل من قائم على هذا العمل.
        </p>
      </main>
    </div>
  );
}
