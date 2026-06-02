import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { years, CATEGORIES } from '../data/years.js'

export default function YearDetail() {
  const { year } = useParams()
  const yNum = Number(year)
  const [filter, setFilter] = useState('all')

  // 切换年份时回到顶部 + 重置筛选
  useEffect(() => {
    window.scrollTo({ top: 0 })
    setFilter('all')
  }, [year])

  const idx = years.findIndex(y => y.year === yNum)
  const data = idx >= 0 ? years[idx] : null
  const prev = idx > 0 ? years[idx - 1] : null
  const next = idx >= 0 && idx < years.length - 1 ? years[idx + 1] : null

  // 该年出现过的分类（用于筛选 chip）
  const presentCats = useMemo(() => {
    if (!data) return []
    const set = new Set((data.events || []).map(e => e.category))
    return Object.keys(CATEGORIES).filter(c => set.has(c))
  }, [data])

  if (!data) {
    return (
      <section className="year-detail">
        <Link to="/biography" className="year-back">← 返回时间轴</Link>
        <div className="year-empty">未找到 {year} 年的记录。</div>
      </section>
    )
  }

  const events = (data.events || []).filter(e => filter === 'all' || e.category === filter)

  return (
    <section className="year-detail">
      <Link to="/biography" className="year-back">← 返回时间轴</Link>

      <div className="year-detail-head">
        <div className="year-detail-num">{data.year}</div>
        {data.title && <h1 className="year-detail-title">{data.title}</h1>}
        {data.summary && <p className="year-detail-summary">{data.summary}</p>}
      </div>

      {presentCats.length > 0 && (
        <div className="year-filter">
          <button
            className={`year-filter-chip${filter === 'all' ? ' active' : ''}`}
            onClick={() => setFilter('all')}
          >
            全部 {data.events.length}
          </button>
          {presentCats.map(c => (
            <button
              key={c}
              className={`year-filter-chip cat-${c}${filter === c ? ' active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {CATEGORIES[c].label} {data.events.filter(e => e.category === c).length}
            </button>
          ))}
        </div>
      )}

      <div className="year-events">
        {events.length === 0 && (
          <div className="year-empty">这一年的详细记录还在补充中。</div>
        )}
        {events.map((e, i) => (
          <motion.div
            key={i}
            className={`year-event cat-${e.category}${e.highlight ? ' major' : ''}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.03 }}
          >
            <div className="year-event-side">
              <span className="year-event-date">{e.date}</span>
              <span className="year-event-cat">{CATEGORIES[e.category]?.label || e.category}</span>
            </div>
            <div className="year-event-body">
              <div className="year-event-title">
                {e.highlight && <span className="year-event-star">★</span>}
                {e.title}
              </div>
              {e.body && <p>{e.body}</p>}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="year-nav">
        {prev ? (
          <Link to={`/biography/${prev.year}`} className="year-nav-link prev">
            ← {prev.year}{prev.title ? ` · ${prev.title}` : ''}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/biography/${next.year}`} className="year-nav-link next">
            {next.year}{next.title ? ` · ${next.title}` : ''} →
          </Link>
        ) : <span />}
      </div>
    </section>
  )
}
