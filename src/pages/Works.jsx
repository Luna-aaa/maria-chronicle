import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { works, WORK_TYPES } from '../data/works.js'
import WorksChart from '../components/WorksChart.jsx'

// 用 type 首字符作为 cover 视觉锚点（中文太长不耐看，用首字符）
const TYPE_ICON = {
  single: '♪',
  album:  '◉',
  tieup:  '✦',
  cover:  '舞',
  event:  '✶'
}

export default function Works() {
  const [filter, setFilter] = useState('all')

  // 按 type 统计数量（filter chip 展示）
  const counts = useMemo(() => {
    const c = { all: works.length }
    Object.keys(WORK_TYPES).forEach(k => { c[k] = 0 })
    works.forEach(w => { c[w.type] = (c[w.type] || 0) + 1 })
    return c
  }, [])

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

      <WorksChart />

      <div className="works-filter" role="tablist">
        <button
          className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          全部 <span className="filter-chip-count">{counts.all}</span>
        </button>
        {Object.entries(WORK_TYPES).map(([key, label]) => (
          <button
            key={key}
            className={`filter-chip filter-chip-${key} ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {label} <span className="filter-chip-count">{counts[key]}</span>
          </button>
        ))}
      </div>

      <div className="works-grid">
        {list.map((w, i) => (
          <motion.div
            className={`work-card work-card-${w.type}`}
            key={`${w.year}-${w.title}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.03 }}
          >
            <div className={`work-cover work-cover-${w.type}`}>
              <span className="work-cover-icon">{TYPE_ICON[w.type]}</span>
              <span className="work-cover-year">{w.year}</span>
            </div>
            <div className="work-body">
              <div className="work-year">{WORK_TYPES[w.type]}</div>
              <div className="work-title">{w.title}</div>
              <div className="work-meta">{w.meta}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
