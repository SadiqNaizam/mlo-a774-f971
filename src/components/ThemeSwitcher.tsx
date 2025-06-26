import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Theme = "light" | "dark" | "doraemon" | "nobita"

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("doraify-theme")
    if (typeof storedPrefs === "string") {
      return storedPrefs as Theme
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)")
    if (userMedia.matches) {
      return "dark"
    }
  }
  return "light" // default theme
}

export function ThemeSwitcher() {
  const [theme, setTheme] = React.useState<Theme>(getInitialTheme)
  console.log('ThemeSwitcher loaded');

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark", "doraemon", "nobita")
    
    // The 'dark' class is a special Tailwind convention.
    // For custom themes, we can add the theme name as a class to the root element
    // and use it in tailwind.config.js with the `data-theme` attribute or similar.
    // For simplicity here, we'll add the class name.
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
        root.classList.add(theme)
    }

    localStorage.setItem("doraify-theme", theme)
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as Theme)}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="doraemon">Doraemon Blue</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="nobita">Nobita Yellow</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitcher;