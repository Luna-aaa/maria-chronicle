import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES, catList } from '../data/years.js'

// 垂直年份轴：每年一个节点，点击进入该年详情页
export default function YearAxis({ years }) {
  return (
    <div className="year-axis">
      {years.map((y, i) => {
        const hasRep = !!y.title
        // 该年各分类的数量，用于卡片底部的小标记
        const counts = {}
        ;(y.events || []).forEach(e => {
          catList(e).forEach(c => { counts[c] = (counts[c] || 0) + 1 })
        })
        return (
          <motion.div
            key={y.slug ?? y.year}
            className={`year-row${y.highlight ? ' major' : ''}${hasRep ? '' : ' muted'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: 0.04 }}
          >
            <div className={`year-num${y.label ? ' range' : ''}`}>{y.label || y.year}</div>
            <span className="year-dot" />
            <Link to={`/biography/${y.slug ?? y.year}`} className="year-card">
              {y.highlight && <span className="year-major-badge">★ 重要一年</span>}
              <div className="year-card-title">
                {hasRep ? y.title : '这一年的记录待补充'}
              </div>
              {y.summary && <div className="year-card-summary">{y.summary}</div>}
              <div className="year-card-foot">
                <span className="year-cat-tags">
                  {Object.keys(counts).map(c => (
                    <span key={c} className={`year-cat-tag cat-${c}`}>
                      {CATEGORIES[c]?.label || c} {counts[c]}
                    </span>
                  ))}
                  {Object.keys(counts).length === 0 && y.photos?.length > 0 && (
                    <span className="year-cat-tag year-cat-tag-photo">影像 {y.photos.length}</span>
                  )}
                </span>
                <span className="year-card-cta">
                  {Object.keys(counts).length === 0 && y.photos?.length > 0 ? '查看影像 →' : '展开这一年 →'}
                </span>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
