import { useTheme } from '../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="切换主题">
      {theme === 'light' ? '🌙 暗' : '☀ 亮'}
    </button>
  )
}
