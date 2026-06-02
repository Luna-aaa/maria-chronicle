import { useMemo } from 'react'
import YearAxis from '../components/YearAxis.jsx'
import { years } from '../data/years.js'

export default function Biography() {
  const stats = useMemo(() => {
    const eventTotal = years.reduce((s, y) => s + (y.events?.length || 0), 0)
    const majors = years.filter(y => y.highlight).length
    return { years: years.length, total: eventTotal, majors }
  }, [])

  return (
    <section className="biography-section">
      <div className="page-heading">
        <h1>生平时间线</h1>
        <p>一年一年，记录美依礼芽从童年到今日的轨迹 · 点击年份展开当年详情</p>
        <div className="page-heading-stats">
          <span className="phs-item"><strong>{stats.years}</strong> 个年份</span>
          <span className="phs-sep" />
          <span className="phs-item"><strong>{stats.total}</strong> 条记录</span>
          <span className="phs-sep" />
          <span className="phs-item phs-major">★ <strong>{stats.majors}</strong> 个重要年份</span>
        </div>
      </div>
      <YearAxis years={years} />
    </section>
  )
}
