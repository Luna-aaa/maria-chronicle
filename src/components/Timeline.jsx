import { motion } from 'framer-motion'
import { Fragment } from 'react'

export default function Timeline({ events }) {
  return (
    <div className="timeline">
      {events.map((ev, i) => {
        if (ev.era) {
          return (
            <div key={`era-${i}`} className="timeline-era">
              <span>{ev.era}</span>
            </div>
          )
        }
        const side = i % 2 === 0 ? 'left' : 'right'
        return (
          <motion.div
            key={i}
            className={`timeline-event ${side}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-date">{ev.date}</div>
              <div className="timeline-title">{ev.title}</div>
              {ev.body && <div className="timeline-body">{ev.body}</div>}
              {ev.tags && (
                <div className="timeline-tags">
                  {ev.tags.map(t => (
                    <span className="timeline-tag" key={t}>#{t}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
