import PomodoroTimer from '@/components/PomodoroTimer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Pomodoro Timer</h1>
      <PomodoroTimer />
    </main>
  )
}
