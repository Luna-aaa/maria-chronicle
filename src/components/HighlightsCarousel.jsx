import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { biography } from '../data/biography.js'

// 从 biography 中提取标记为 highlight 的事件，并为每个事件计算其所属 era 的 eraId
function buildHighlights() {
  const list = []
  let eraIdx = -1
  biography.forEach(ev => {
    if (ev.era) {
      eraIdx += 1
    } else if (ev.highlight) {
      list.push({
        date: ev.date,
        title: ev.title,
        body: ev.body,
        tags: ev.tags || [],
        eraId: `era-${eraIdx}`
      })
    }
  })
  return list
}

export default function HighlightsCarousel() {
  const highlights = useMemo(buildHighlights, [])
  return (
    <section className="highlights">
      <div className="highlights-head">
        <h2>命运节点</h2>
        <p>选取生涯中的 {highlights.length} 个高光时刻 · 点击进入时间轴对应章节</p>
      </div>
      <div className="highlights-track" tabIndex={0} aria-label="高光时刻轮播">
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            className="highlight-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Link
              to="/biography"
              state={{ scrollToEra: h.eraId }}
              className="highlight-link"
            >
              <div className="highlight-index">#{String(i + 1).padStart(2, '0')}</div>
              <div className="highlight-date">{h.date}</div>
              <div className="highlight-title">{h.title}</div>
              <div className="highlight-body">{h.body}</div>
              <div className="highlight-cta">查看 →</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
