"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null 

  const currentTheme = resolvedTheme || "light"

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="rounded-full p-1 text-gray-200 cursor-pointer hover:text-teal-300  dark:hover:text-white "
    >
      {currentTheme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
    </button>
  )
}
