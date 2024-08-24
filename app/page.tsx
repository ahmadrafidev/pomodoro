import PomodoroTimer from '@/components/PomodoroTimer'
import DarkModeToggle from '@/components/ui/DarkModeToggle';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 md:p-24">
      <header className="p-3 absolute top-0 right-0">
        <DarkModeToggle />
      </header>
      <h1 className="mb-8 text-4xl font-bold">Pomodoro Timer</h1>
      <PomodoroTimer />
    </main>
  )
}
