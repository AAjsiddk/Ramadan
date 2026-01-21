'use client';
import type { ComponentProps } from 'react';
import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Download,
  ShieldCheck,
  ClipboardCopy,
  ExternalLink,
  Bot,
  Rss,
} from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    name: 'تحميل الدفتر',
    description: 'ملف PDF يحتوي على معلومات هامة.',
    url: 'https://drive.google.com/uc?export=download&id=1Cs63Cze5ApCqNfeWRZ_pyM_xIZoB87zC',
    Icon: (props: ComponentProps<'svg'>) => <Download {...props} />,
  },
  {
    name: 'تحميل التطبيق',
    description: 'تطبيق Kilonotes لتدوين الملاحظات.',
    url: 'https://play.google.com/store/apps/details?id=com.topstack.kilonotes.pad',
    Icon: (props: ComponentProps<'svg'>) => <Download {...props} />,
  },
  {
    name: 'موقع نجاتك بيدك',
    description: 'موقع للأذكار والمواظبة على الطاعات.',
    url: 'https://remembrances-1.vercel.app/',
    Icon: (props: ComponentProps<'svg'>) => <ShieldCheck {...props} />,
  },
  {
    name: 'بوت التواصل',
    description: 'بوت للتواصل عبر تيليجرام.',
    url: 'https://t.me/Ramadan000_bot',
    Icon: (props: ComponentProps<'svg'>) => <Bot {...props} />,
  },
  {
    name: 'قناة الواتساب',
    description: 'انضم إلى قناتنا على الواتساب.',
    url: 'https://whatsapp.com/channel/0029VbCC6Ta6buMTCGX6Um0F',
    Icon: (props: ComponentProps<'svg'>) => <Rss {...props} />,
  },
];

export function ResourceLinks() {
  const { toast } = useToast();

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'تم نسخ الرابط!',
      description: 'تم نسخ رابط الصفحة إلى الحافظة.',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map(({ name, url, Icon, description }) => (
        <Card
          key={name}
          className="group flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-card/50 hover:bg-card hover:shadow-primary/10 hover:shadow-lg hover:border-primary/30"
        >
          <CardHeader className="flex flex-row items-start gap-4 p-4 flex-1">
            <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0 transition-colors duration-300">
              <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-bold">{name}</CardTitle>
              <CardDescription className="mt-1 text-muted-foreground">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="flex items-center justify-end gap-2 bg-black/10 dark:bg-black/20 p-3 mt-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(url)}
              aria-label={`نسخ رابط ${name}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <ClipboardCopy className="h-4 w-4" />
            </Button>
            <Button size="sm" asChild>
              <Link href={url} target="_blank" rel="noopener noreferrer">
                افتح الرابط
                <ExternalLink className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
