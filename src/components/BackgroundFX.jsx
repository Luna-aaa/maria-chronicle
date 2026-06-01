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
// angle 必须为正：正值 = 顺时针旋转 = 向右下方向飞（流星该有的方向）
const METEORS = [
  { left: '5%',  top: '-8vh',  angle: 38, delay: 0,    duration: 14, length: '180px' },
  { left: '28%', top: '-4vh',  angle: 42, delay: 3.0,  duration: 13, length: '220px' },
  { left: '52%', top: '-10vh', angle: 48, delay: 6.2,  duration: 15, length: '160px' },
  { left: '72%', top: '-6vh',  angle: 34, delay: 9.4,  duration: 12, length: '200px' },
  { left: '40%', top: '-12vh', angle: 45, delay: 12.5, duration: 14, length: '240px' }
]
