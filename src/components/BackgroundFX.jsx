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
      {METEORS.map((m, i) => (
        <span
          key={`meteor-${i}`}
          className="meteor"
          style={{
            '--meteor-left': m.left,
            '--meteor-top': m.top,
            '--meteor-angle': `${m.angle}deg`,
            '--meteor-delay': `${m.delay}s`,
            '--meteor-duration': `${m.duration}s`,
            '--meteor-length': m.length
          }}
        />
      ))}
    </div>
  )
}

// 流星错峰配置：长 duration + 短可见区间形成「偶尔划过」的节奏
const METEORS = [
  { left: '12%', top: '-6vh',  angle: -38, delay: 0,    duration: 16, length: '180px' },
  { left: '38%', top: '4vh',   angle: -42, delay: 3.6,  duration: 15, length: '220px' },
  { left: '62%', top: '-10vh', angle: -48, delay: 7.4,  duration: 18, length: '160px' },
  { left: '82%', top: '6vh',   angle: -34, delay: 11.2, duration: 14, length: '200px' },
  { left: '50%', top: '-4vh',  angle: -45, delay: 14.5, duration: 17, length: '240px' }
]
