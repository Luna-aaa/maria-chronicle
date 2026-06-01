import { useEffect, useState, useRef } from 'react'

// 侧边章节导航 + scroll spy
// PC: 固定在视口右侧（>=1280px）
// 平板/手机: 顶部横向滚动 chip bar
export default function TimelineNav({ eras }) {
  const [active, setActive] = useState(eras[0]?.id)
  const navRef = useRef(null)

  useEffect(() => {
    if (!eras.length) return
    const observer = new IntersectionObserver(
      entries => {
        // 取离顶部最近且仍在视口内的 era
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    eras.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [eras])

  // 移动端 chip bar 自动滚到激活项
  useEffect(() => {
    if (!navRef.current) return
    const el = navRef.current.querySelector(`[data-era-id="${active}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* PC 侧边导航 */}
      <aside className="timeline-nav-side" aria-label="时期导航">
        <div className="timeline-nav-title">章节</div>
        <ul>
          {eras.map(era => (
            <li key={era.id}>
              <button
                className={`timeline-nav-item ${active === era.id ? 'active' : ''}`}
                onClick={() => handleClick(era.id)}
                title={era.label}
              >
                <span className="timeline-nav-dot" />
                <span className="timeline-nav-label">{era.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* 移动端 chip bar */}
      <div className="timeline-nav-bar" ref={navRef} aria-label="时期导航（移动端）">
        {eras.map(era => (
          <button
            key={era.id}
            data-era-id={era.id}
            className={`timeline-nav-chip ${active === era.id ? 'active' : ''}`}
            onClick={() => handleClick(era.id)}
          >
            {era.label}
          </button>
        ))}
      </div>
    </>
  )
}
