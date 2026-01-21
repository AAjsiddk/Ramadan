'use client';
import { useFormState, useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, NotebookText, Sparkles } from 'lucide-react';
import { handleGeneratePrayer, type PrayerState } from '@/app/actions';
import { Checkbox } from '../ui/checkbox';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const prayerTopics = [
  'Forgiveness',
  'Guidance',
  'Gratitude',
  'Patience',
  'Strength',
  'Family',
  'Health',
  'Community',
];

const initialState: PrayerState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2" />
          Generate Prayer
        </>
      )}
    </Button>
  );
}

export function DailyReflection() {
  const [state, formAction] = useFormState(handleGeneratePrayer, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.errors?.server) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.errors.server,
      });
    }
    if (state.prayer) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <NotebookText className="h-6 w-6 text-primary" />
          Daily Reflection
        </CardTitle>
        <CardDescription>
          Enter your daily thoughts and generate a personalized prayer to guide
          your intentions.
        </CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reflection">How was your day?</Label>
            <Textarea
              id="reflection"
              name="reflection"
              placeholder="Reflect on your fast, your prayers, your actions..."
              rows={6}
              required
            />
            {state.errors?.reflection && (
              <p className="text-sm text-destructive">
                {state.errors.reflection[0]}
              </p>
            )}
          </div>
          <div className="space-y-3">
            <Label>Prayer Topics (Optional)</Label>
            <div className="flex flex-wrap gap-3">
              {prayerTopics.map((topic) => (
                <div key={topic} className="flex items-center">
                  <Checkbox
                    id={`topic-${topic}`}
                    name="topics"
                    value={topic}
                    className="mr-2"
                  />
                  <Label htmlFor={`topic-${topic}`} className="font-normal">
                    {topic}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <SubmitButton />
          {state.prayer && (
            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent">
              Prayer generated successfully! See below.
            </Badge>
          )}
        </CardFooter>
      </form>
      {state.prayer && (
        <div className="p-6 pt-0">
          <Card className="bg-primary/10 border-primary/50 shadow-inner">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 font-headline">
                <Sparkles className="text-primary" />
                Your Personalized Prayer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap font-body text-foreground/90">
                {state.prayer}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
