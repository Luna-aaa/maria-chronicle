import { useMemo, useState } from 'react'
import { works, WORK_TYPES } from '../data/works.js'

export default function Works() {
  const [filter, setFilter] = useState('all')

  const list = useMemo(() => {
    const sorted = [...works].sort((a, b) => b.year - a.year)
    return filter === 'all' ? sorted : sorted.filter(w => w.type === filter)
  }, [filter])

  return (
    <section>
      <div className="page-heading">
        <h1>作品 & 重要事件</h1>
        <p>音乐单曲 · 专辑 · 动画合作 · 舞台与现场</p>
      </div>

      <div className="works-filter">
        <button
          className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          全部
        </button>
        {Object.entries(WORK_TYPES).map(([key, label]) => (
          <button
            key={key}
            className={`filter-chip ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="works-grid">
        {list.map((w, i) => (
          <div className="work-card" key={i}>
            <div className="work-year">{w.year} · {WORK_TYPES[w.type]}</div>
            <div className="work-title">{w.title}</div>
            <div className="work-meta">{w.meta}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
