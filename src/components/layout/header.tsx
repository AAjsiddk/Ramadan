import { Moon } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full p-4 md:p-6 flex items-center justify-center text-center bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <Moon className="h-7 w-7 md:h-8 md:w-8 mr-3 md:mr-4 text-primary" />
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground tracking-tight">
        Ramadan Reflections
      </h1>
    </header>
  );
}
