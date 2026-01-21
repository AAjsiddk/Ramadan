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
  BookHeart,
  ClipboardCopy,
  Download,
  ExternalLink,
  MessageCircle,
  Send,
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
    Icon: (props: ComponentProps<'svg'>) => <BookHeart {...props} />,
  },
  {
    name: 'بوت التواصل',
    description: 'بوت للتواصل عبر تيليجرام.',
    url: 'https://t.me/Ramadan000_bot',
    Icon: (props: ComponentProps<'svg'>) => <Send {...props} />,
  },
  {
    name: 'قناة الواتساب',
    description: 'انضم إلى قناتنا على الواتساب.',
    url: 'https://whatsapp.com/channel/0029VbCC6Ta6buMTCGX6Um0F',
    Icon: (props: ComponentProps<'svg'>) => <MessageCircle {...props} />,
  },
];

export function ResourceLinks() {
  const { toast } = useToast();

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'تم نسخ الرابط!',
      description: 'تم نسخ الرابط إلى الحافظة.',
    });
  };

  return (
    <div className="space-y-4">
      {resources.map(({ name, url, Icon, description }) => (
        <Card key={name}>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardFooter className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopy(url)}
              aria-label={`نسخ رابط ${name}`}
            >
              <ClipboardCopy className="h-5 w-5" />
            </Button>
            <Button asChild>
              <Link href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                افتح الرابط
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
