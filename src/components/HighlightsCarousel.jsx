import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { highlightYears } from '../data/years.js'

export default function HighlightsCarousel() {
  const highlights = useMemo(highlightYears, [])
  return (
    <section className="highlights">
      <div className="highlights-head">
        <h2>命运节点</h2>
        <p>选取生涯中的 {highlights.length} 个高光年份 · 点击进入当年详情</p>
      </div>
      <div className="highlights-track" tabIndex={0} aria-label="高光时刻轮播">
        {highlights.map((h, i) => (
          <motion.div
            key={h.year}
            className="highlight-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Link to={`/biography/${h.year}`} className="highlight-link">
              <div className="highlight-index">#{String(i + 1).padStart(2, '0')}</div>
              <div className="highlight-date">{h.year}</div>
              <div className="highlight-title">{h.title}</div>
              <div className="highlight-body">{h.summary}</div>
              <div className="highlight-cta">查看 →</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
