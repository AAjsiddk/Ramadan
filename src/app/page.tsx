'use client';

import { ResourceLinks } from '@/components/features/resource-links';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

export default function Home() {
  const { toast } = useToast();
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

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
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            أهلاً بك في دفتر رمضان
          </h2>

          <Collapsible
            open={isWelcomeOpen}
            onOpenChange={setIsWelcomeOpen}
            className="w-full max-w-3xl mx-auto"
          >
            <CollapsibleContent className="space-y-4 text-lg text-muted-foreground">
              رمضان فرصة حقيقية للتقرب إلى الله وترتيب أولوياتنا. هذا الدفتر
              مصمم ليكون رفيقك، يساعدك على الالتزام بهدوء وسكينة، خطوة بخطوة،
              بلا ضغط أو تعقيد. نسأل الله أن يوفقك ويتقبل منك صالح الأعمال.
            </CollapsibleContent>
            <div className="flex items-center justify-center mt-4">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  {isWelcomeOpen ? 'إخفاء الرسالة' : 'إظهار الرسالة'}
                  <ChevronDown
                    className={`h-4 w-4 mr-2 transition-transform duration-300 ${
                      isWelcomeOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
            </div>
          </Collapsible>

          <Button variant="outline" onClick={handleShare}>
            <Share2 className="ml-2 h-4 w-4" />
            مشاركة الصفحة
          </Button>
        </div>

        <ResourceLinks />

        <p className="text-center text-sm text-muted-foreground mt-12">
          الرجاء الدعاء لكل من ساهم في هذا العمل.
        </p>
      </main>
    </div>
  );
}
