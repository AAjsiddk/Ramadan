'use client';

import { ResourceLinks } from '@/components/features/resource-links';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2 } from 'lucide-react';

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
      <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold font-headline">دفتر رمضان</h2>
          <p className="text-muted-foreground">
            أهلاً بك، اختر الرابط المناسب لك 👋
          </p>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="ml-2 h-4 w-4" />
            مشاركة الصفحة
          </Button>
        </div>
        <ResourceLinks />
        <p className="text-center text-sm text-muted-foreground mt-8">
          الرجاء الدعاء لكل من قائم على هذا العمل.
        </p>
      </main>
    </div>
  );
}
