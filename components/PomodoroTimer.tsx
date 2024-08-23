'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Timer, Pause, RotateCcw } from 'lucide-react'

export default function Component() {
  const [duration, setDuration] = useState(25)
  const [minutes, setMinutes] = useState(duration)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isWork, setIsWork] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          clearInterval(interval)
          setIsActive(false)
          setIsWork(!isWork)
          setMinutes(isWork ? 5 : duration)
          setSeconds(0)
        }
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds, isWork, duration])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(duration)
    setSeconds(0)
    setIsWork(true)
  }

  const handleDurationChange = (value: string) => {
    const newDuration = parseInt(value, 10)
    setDuration(newDuration)
    if (!isActive) {
      setMinutes(newDuration)
      setSeconds(0)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isWork ? 'Focus Session' : 'Break Time'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-6xl font-bold text-center mb-6" aria-live="polite">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <Button onClick={toggleTimer} variant="outline" size="icon">
            {isActive ? <Pause className="h-6 w-6" /> : <Timer className="h-6 w-6" />}
            <span className="sr-only">{isActive ? 'Pause' : 'Start'}</span>
          </Button>
          <Button onClick={resetTimer} variant="outline" size="icon">
            <RotateCcw className="h-6 w-6" />
            <span className="sr-only">Reset</span>
          </Button>
        </div>
        <RadioGroup
          defaultValue="25"
          onValueChange={handleDurationChange}
          className="flex justify-center space-x-2"
        >
          {[25, 30, 45, 60].map((time) => (
            <div key={time} className="flex items-center space-x-2">
              <RadioGroupItem value={time.toString()} id={`time-${time}`} />
              <Label htmlFor={`time-${time}`}>{time}m</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
