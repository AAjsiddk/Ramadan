'use client';
import React from 'react';
import {
  Download,
  Bot,
  Network,
  MessageCircle,
} from 'lucide-react';
import { ResourceCard } from './resource-card';

const resources = [
  {
    name: 'تحميل الدفتر',
    description: 'ملف PDF يحتوي على معلومات هامة.',
    url: 'https://drive.google.com/uc?export=download&id=1Cs63Cze5ApCqNfeWRZ_pyM_xIZoB87zC',
    Icon: Download,
  },
  {
    name: 'تحميل التطبيق',
    description: 'تطبيق Kilonotes لتدوين الملاحظات.',
    url: 'https://play.google.com/store/apps/details?id=com.luminpdfapp',
    Icon: Download,
  },
  {
    name: 'موقع نجاتك بيدك',
    description: 'موقع للأذكار والمواظبة على الطاعات.',
    url: 'https://remembrances-1.vercel.app/',
    Icon: Network,
  },
  {
    name: 'بوت التواصل',
    description: 'بوت للتواصل عبر تيليجرام.',
    url: 'https://t.me/Ramadan000_bot',
    Icon: Bot,
  },
  {
    name: 'قناة الواتساب',
    description: 'انضم إلى قناتنا على الواتساب.',
    url: 'https://whatsapp.com/channel/0029VbCC6Ta6buMTCGX6Um0F',
    Icon: MessageCircle,
  },
];

export function ResourceLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((resource) => (
        <ResourceCard key={resource.name} {...resource} />
      ))}
    </div>
  );
}
