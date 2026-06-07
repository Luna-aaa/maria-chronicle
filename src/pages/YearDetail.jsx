import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { years, CATEGORIES, catList, primaryCat, normPhoto } from '../data/years.js'

const MotionLink = motion(Link)

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
    const set = new Set((data.events || []).flatMap(catList))
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

  const events = (data.events || []).filter(e => filter === 'all' || catList(e).includes(filter))

  return (
    <section className="year-detail">
      <Link to="/biography" className="year-back">← 返回时间轴</Link>

      <div className="year-detail-head">
        <div className="year-detail-num">{data.label || data.year}</div>
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
              {CATEGORIES[c].label} {data.events.filter(e => catList(e).includes(c)).length}
            </button>
          ))}
        </div>
      )}

      <div className="year-events">
        {events.length === 0 && !(data.photos && data.photos.length) && (
          <div className="year-empty">这一年的详细记录还在补充中。</div>
        )}
        {events.map((e, i) => (
          <MotionLink
            key={e.id || i}
            to={`/item/${e.id}`}
            className={`year-event cat-${primaryCat(e)}${e.highlight ? ' major' : ''}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.03 }}
          >
            <div className="year-event-side">
              <span className="year-event-date">{e.date}</span>
              <span className="year-event-cat">{catList(e).map(c => CATEGORIES[c]?.label || c).join(' · ')}</span>
            </div>
            <div className="year-event-body">
              <div className="year-event-title">
                {e.highlight && <span className="year-event-star">★</span>}
                {e.title}
              </div>
              {e.body && <p>{e.body}</p>}
              {e.tags && e.tags.length > 0 && (
                <div className="year-event-tags">
                  {e.tags.map(t => <span key={t} className="year-event-tag">#{t}</span>)}
                </div>
              )}
            </div>
          </MotionLink>
        ))}
      </div>

      {filter === 'all' && data.photos && data.photos.length > 0 && (
        <div className="year-gallery">
          <h3 className="year-gallery-title">{data.label ? '影像合辑' : '这一年的影像'}</h3>
          <div className="item-photos">
            {data.photos.map(normPhoto).map((p, i) => (
              <figure key={i} className="item-photo">
                <img src={p.src} alt={p.caption || `${data.year} 年影像 ${i + 1}`} loading="lazy" />
                {p.caption && <figcaption>{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      )}

      <div className="year-nav">
        {prev ? (
          <Link to={`/biography/${prev.year}`} className="year-nav-link prev">
            ← {prev.label || prev.year}{prev.title ? ` · ${prev.title}` : ''}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/biography/${next.year}`} className="year-nav-link next">
            {next.label || next.year}{next.title ? ` · ${next.title}` : ''} →
          </Link>
        ) : <span />}
      </div>
    </section>
  )
}
