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
import { ClipboardCopy, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type ResourceCardProps = {
  name: string;
  description: string;
  url: string;
  Icon: (props: ComponentProps<'svg'>) => JSX.Element;
};

export function ResourceCard({
  name,
  url,
  Icon,
  description,
}: ResourceCardProps) {
  const { toast } = useToast();

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'تم نسخ الرابط!',
      description: 'تم نسخ رابط الصفحة إلى الحافظة.',
    });
  };

  return (
    <Card
      key={name}
      className="group flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-card hover:border-primary/50 hover:bg-accent hover:-translate-y-1"
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
      <CardFooter className="flex items-center justify-end gap-2 bg-secondary/50 p-3 mt-auto">
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
  );
}
