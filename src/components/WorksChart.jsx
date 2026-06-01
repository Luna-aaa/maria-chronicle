import { useMemo } from 'react'
import { works, WORK_TYPES } from '../data/works.js'

const TYPE_ORDER = ['single', 'album', 'tieup', 'cover', 'event']

export default function WorksChart() {
  const { years, byYearType, maxCount } = useMemo(() => {
    const minYear = Math.min(...works.map(w => w.year))
    const maxYear = Math.max(...works.map(w => w.year))
    const years = []
    for (let y = minYear; y <= maxYear; y++) years.push(y)
    const byYearType = {}
    years.forEach(y => {
      byYearType[y] = {}
      TYPE_ORDER.forEach(t => { byYearType[y][t] = 0 })
    })
    works.forEach(w => {
      if (byYearType[w.year]) byYearType[w.year][w.type] += 1
    })
    const maxCount = Math.max(
      ...years.map(y => TYPE_ORDER.reduce((s, t) => s + byYearType[y][t], 0))
    )
    return { years, byYearType, maxCount }
  }, [])

  // SVG 布局参数
  const W = 800
  const H = 220
  const padL = 32
  const padR = 12
  const padT = 16
  const padB = 32
  const chartW = W - padL - padR
  const chartH = H - padT - padB
  const barGap = 4
  const slotW = chartW / years.length
  const barW = slotW - barGap

  return (
    <div className="works-chart">
      <div className="works-chart-head">
        <h3>作品 / 事件年度分布</h3>
        <span className="works-chart-sub">
          {works.length} 项 · {years[0]}–{years[years.length - 1]}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="works-chart-svg"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="按年份的作品/事件数量堆叠图"
      >
        {/* Y 轴刻度线 */}
        {[0, 0.5, 1].map(r => {
          const y = padT + chartH * (1 - r)
          const v = Math.round(maxCount * r)
          return (
            <g key={r}>
              <line
                x1={padL}
                x2={W - padR}
                y1={y}
                y2={y}
                className="chart-gridline"
              />
              <text
                x={padL - 6}
                y={y + 4}
                className="chart-axis-text"
                textAnchor="end"
              >
                {v}
              </text>
            </g>
          )
        })}
        {/* 柱子 */}
        {years.map((y, i) => {
          const x = padL + i * slotW + barGap / 2
          let acc = 0
          const total = TYPE_ORDER.reduce((s, t) => s + byYearType[y][t], 0)
          return (
            <g key={y}>
              {TYPE_ORDER.map(t => {
                const count = byYearType[y][t]
                if (!count) return null
                const h = (count / maxCount) * chartH
                const yPos = padT + chartH - acc - h
                acc += h
                return (
                  <rect
                    key={t}
                    x={x}
                    y={yPos}
                    width={barW}
                    height={h}
                    className={`chart-bar chart-bar-${t}`}
                  >
                    <title>{y} · {WORK_TYPES[t]}: {count}</title>
                  </rect>
                )
              })}
              {/* 总数标在柱顶（仅 >0 时） */}
              {total > 0 && (
                <text
                  x={x + barW / 2}
                  y={padT + chartH - (total / maxCount) * chartH - 4}
                  className="chart-bar-label"
                  textAnchor="middle"
                >
                  {total}
                </text>
              )}
              {/* X 轴年份（隔一年显示一次以防重叠） */}
              {(i % 2 === 0 || i === years.length - 1) && (
                <text
                  x={x + barW / 2}
                  y={H - padB + 16}
                  className="chart-axis-text"
                  textAnchor="middle"
                >
                  {y}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      <div className="works-chart-legend">
        {TYPE_ORDER.map(t => (
          <span key={t} className="chart-legend-item">
            <span className={`chart-legend-dot chart-bar-${t}`} />
            {WORK_TYPES[t]}
          </span>
        ))}
      </div>
    </div>
  )
}
