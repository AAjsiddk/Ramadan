'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Share2,
  ChevronDown,
  MessageSquare,
  Send,
  Link as LinkIcon,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function WelcomeSection() {
  const { toast } = useToast();
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'تم نسخ الرابط!',
      description: 'تم نسخ رابط الصفحة إلى الحافظة.',
    });
  };

  const shareOnWhatsapp = () => {
    const text = encodeURIComponent(
      document.title + '\n' + window.location.href
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareOnTelegram = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  return (
    <div className="text-center space-y-6 mb-12">
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
        أهلاً بك في دفتر رمضان
      </h2>

      <Collapsible
        open={isWelcomeOpen}
        onOpenChange={setIsWelcomeOpen}
        className="w-full max-w-3xl mx-auto"
      >
        <CollapsibleContent className="space-y-4 text-lg text-muted-foreground">
          رمضان فرصة حقيقية للتقرب إلى الله وترتيب أولوياتنا. هذا الدفتر مصمم
          ليكون رفيقك، يساعدك على الالتزام بهدوء وسكينة، خطوة بخطوة، بلا ضغط
          أو تعقيد. نسأل الله أن يوفقك ويتقبل منك صالح الأعمال.
        </CollapsibleContent>
        <div className="flex items-center justify-center mt-4">
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-accent/50 hover:bg-accent"
            >
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Share2 className="ml-2 h-4 w-4" />
            مشاركة الصفحة
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={shareOnWhatsapp}>
            <MessageSquare className="ml-2 h-4 w-4" />
            <span>واتساب</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnTelegram}>
            <Send className="ml-2 h-4 w-4" />
            <span>تيليجرام</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyLink}>
            <LinkIcon className="ml-2 h-4 w-4" />
            <span>نسخ الرابط</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
