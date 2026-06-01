import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Timeline from '../components/Timeline.jsx'
import TimelineNav from '../components/TimelineNav.jsx'
import { biography, enrichBiography, extractEras } from '../data/biography.js'

export default function Biography() {
  const location = useLocation()
  const enriched = useMemo(() => enrichBiography(biography), [])
  const eras = useMemo(() => extractEras(biography), [])

  // 从首页 carousel 跳转过来时，自动滚动到指定 era
  useEffect(() => {
    const target = location.state?.scrollToEra
    if (!target) return
    // 等渲染稳定
    const t = setTimeout(() => {
      const el = document.getElementById(target)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => clearTimeout(t)
  }, [location.state])

  return (
    <section className="biography-section">
      <div className="page-heading">
        <h1>生平时间线</h1>
        <p>按时间顺序记录美依礼芽从童年到今日的关键节点</p>
      </div>
      <div className="biography-layout">
        <Timeline events={enriched} />
        <TimelineNav eras={eras} />
      </div>
    </section>
  )
}
