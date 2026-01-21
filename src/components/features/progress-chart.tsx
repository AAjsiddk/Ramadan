'use client';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';

const chartData = Array.from({ length: 15 }, (_, i) => ({
  day: `Day ${i + 1}`,
  progress: Math.floor(Math.random() * (9 - 4 + 1)) + 4,
}));

const chartConfig = {
  progress: {
    label: 'Spiritual Progress',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export function ProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          Spiritual Progress
        </CardTitle>
        <CardDescription>
          A visualization of your journey this Ramadan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value, index) =>
                (index + 1) % 3 === 0 ? value : ''
              }
            />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="progress" fill="var(--color-progress)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
