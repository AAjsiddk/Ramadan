'use client';
import type { ComponentProps } from 'react';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  ClipboardCopy,
  Link as LinkIcon,
  MessageCircle,
  Send,
} from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    name: 'Kilonotes',
    url: '#',
    Icon: (props: ComponentProps<'svg'>) => <LinkIcon {...props} />,
  },
  {
    name: 'نجاتك بيدك',
    url: '#',
    Icon: (props: ComponentProps<'svg'>) => <LinkIcon {...props} />,
  },
  {
    name: 'Ramadan Telegram bot',
    url: '#',
    Icon: (props: ComponentProps<'svg'>) => <Send {...props} />,
  },
  {
    name: 'Ramadan WhatsApp channel',
    url: '#',
    Icon: (props: ComponentProps<'svg'>) => <MessageCircle {...props} />,
  },
];

export function ResourceLinks() {
  const { toast } = useToast();

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied!',
      description: 'The link has been copied to your clipboard.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Helpful Resources</CardTitle>
        <CardDescription>
          Quick access to tools and channels for your Ramadan journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map(({ name, url, Icon }) => (
            <div
              key={name}
              className="flex items-center justify-between p-3 rounded-lg border bg-background"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-accent" />
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm hover:underline"
                >
                  {name}
                </Link>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleCopy(url)}
                aria-label={`Copy link for ${name}`}
              >
                <ClipboardCopy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
