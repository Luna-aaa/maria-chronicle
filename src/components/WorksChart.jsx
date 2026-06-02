import { useMemo } from 'react'
import { getAllItems, MAJORS } from '../data/years.js'

const CAT_ORDER = ['music', 'dance', 'live', 'exp']

export default function WorksChart() {
  const { years, byYearCat, maxCount, total } = useMemo(() => {
    const items = getAllItems()
    const minYear = Math.min(...items.map(w => w.year))
    const maxYear = Math.max(...items.map(w => w.year))
    const years = []
    for (let y = minYear; y <= maxYear; y++) years.push(y)
    const byYearCat = {}
    years.forEach(y => {
      byYearCat[y] = {}
      CAT_ORDER.forEach(c => { byYearCat[y][c] = 0 })
    })
    items.forEach(w => {
      if (byYearCat[w.year] && byYearCat[w.year][w.cat] !== undefined) byYearCat[w.year][w.cat] += 1
    })
    const maxCount = Math.max(
      ...years.map(y => CAT_ORDER.reduce((s, c) => s + byYearCat[y][c], 0))
    )
    return { years, byYearCat, maxCount, total: items.length }
  }, [])

  const W = 800, H = 220, padL = 32, padR = 12, padT = 16, padB = 32
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
          {total} 项 · {years[0]}–{years[years.length - 1]}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="works-chart-svg"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="按年份的作品/事件数量堆叠图"
      >
        {[0, 0.5, 1].map(r => {
          const y = padT + chartH * (1 - r)
          const v = Math.round(maxCount * r)
          return (
            <g key={r}>
              <line x1={padL} x2={W - padR} y1={y} y2={y} className="chart-gridline" />
              <text x={padL - 6} y={y + 4} className="chart-axis-text" textAnchor="end">{v}</text>
            </g>
          )
        })}
        {years.map((y, i) => {
          const x = padL + i * slotW + barGap / 2
          let acc = 0
          const total = CAT_ORDER.reduce((s, c) => s + byYearCat[y][c], 0)
          return (
            <g key={y}>
              {CAT_ORDER.map(c => {
                const count = byYearCat[y][c]
                if (!count) return null
                const h = (count / maxCount) * chartH
                const yPos = padT + chartH - acc - h
                acc += h
                return (
                  <rect
                    key={c}
                    x={x}
                    y={yPos}
                    width={barW}
                    height={h}
                    className="chart-bar"
                    style={{ fill: `var(--cat-${c})` }}
                  >
                    <title>{y} · {MAJORS[c].label}: {count}</title>
                  </rect>
                )
              })}
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
              {(i % 2 === 0 || i === years.length - 1) && (
                <text x={x + barW / 2} y={H - padB + 16} className="chart-axis-text" textAnchor="middle">
                  {y}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      <div className="works-chart-legend">
        {CAT_ORDER.map(c => (
          <span key={c} className="chart-legend-item">
            <span className="chart-legend-dot" style={{ background: `var(--cat-${c})` }} />
            {MAJORS[c].label}
          </span>
        ))}
      </div>
    </div>
  )
}
