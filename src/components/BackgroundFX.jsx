import { useTheme } from '../context/ThemeContext.jsx'

// 装饰性背景层：浅色为飘落的樱花/光斑，深色为星点 + 紫红光晕。
// 全部纯 CSS + DOM，无图片依赖，性能良好。
export default function BackgroundFX() {
  const { theme } = useTheme()

  if (theme === 'light') {
    return (
      <div className="bg-fx" aria-hidden="true">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${(i * 7.3) % 100}%`,
              animationDelay: `${(i * 1.7) % 12}s`,
              animationDuration: `${10 + (i % 5) * 2}s`
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-grid" />
      {Array.from({ length: 60 }).map((_, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: `${(i * 13.7) % 100}%`,
            top: `${(i * 19.3) % 100}%`,
            animationDelay: `${(i % 7) * 0.6}s`,
            opacity: 0.3 + ((i % 5) * 0.12)
          }}
        />
      ))}
    </div>
  )
}
