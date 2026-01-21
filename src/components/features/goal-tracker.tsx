'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Goal, PlusCircle } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

type Goal = {
  id: number;
  text: string;
  completed: boolean;
};

const initialGoals: Goal[] = [
  { id: 1, text: 'Read 1 Juz of Quran daily', completed: false },
  { id: 2, text: 'Perform Tarawih prayers', completed: true },
  { id: 3, text: 'Give charity (Sadaqah)', completed: false },
  { id: 4, text: 'Avoid gossip and negative talk', completed: true },
];

export function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim() === '') return;
    const goal: Goal = {
      id: Date.now(),
      text: newGoal,
      completed: false,
    };
    setGoals([...goals, goal]);
    setNewGoal('');
  };

  const toggleGoal = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const completedGoals = goals.filter((g) => g.completed).length;
  const totalGoals = goals.length;
  const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Goal className="h-6 w-6 text-primary" />
          My Ramadan Goals
        </CardTitle>
        <CardDescription>
          Set and track your personal goals for this blessed month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 pr-4">
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`goal-${goal.id}`}
                  checked={goal.completed}
                  onCheckedChange={() => toggleGoal(goal.id)}
                />
                <Label
                  htmlFor={`goal-${goal.id}`}
                  className={`flex-1 text-sm ${
                    goal.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {goal.text}
                </Label>
              </div>
            ))}
            {goals.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No goals yet. Add one below!
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <div className="w-full">
          <div
            className="relative h-2 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full w-full flex-1 bg-accent transition-all"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {completedGoals} / {totalGoals} completed
          </p>
        </div>
        <form onSubmit={handleAddGoal} className="flex w-full space-x-2">
          <Input
            type="text"
            placeholder="Add a new goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <Button type="submit" size="icon" aria-label="Add Goal">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
