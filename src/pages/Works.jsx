import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllItems, MAJORS } from '../data/years.js'
import WorksChart from '../components/WorksChart.jsx'

const MotionLink = motion(Link)

// 大类图标
const CAT_ICON = { music: '♪', dance: '舞', live: '✶', exp: '◈' }

export default function Works() {
  // 作品页排除「经历」(cat:'life')；综艺等其余照常收录。生平页不受影响。
  const allItems = useMemo(
    () => getAllItems().filter(it => it.cat !== 'life').sort((a, b) => b.year - a.year),
    []
  )
  const [major, setMajor] = useState('all')   // 大类
  const [sub, setSub] = useState('all')        // 小类

  // 各大类数量
  const majorCounts = useMemo(() => {
    const c = { all: allItems.length }
    Object.keys(MAJORS).forEach(k => { c[k] = 0 })
    allItems.forEach(it => { c[it.cat] = (c[it.cat] || 0) + 1 })
    return c
  }, [allItems])

  // 当前大类下的小类（含数量）
  const subOptions = useMemo(() => {
    if (major === 'all' || !MAJORS[major]) return []
    const subs = MAJORS[major].subs
    return Object.keys(subs).map(k => ({
      key: k,
      label: subs[k],
      count: allItems.filter(it => it.cat === major && it.sub === k).length
    })).filter(o => o.count > 0)
  }, [major, allItems])

  const list = useMemo(() => {
    return allItems.filter(it => {
      if (major !== 'all' && it.cat !== major) return false
      if (sub !== 'all' && it.sub !== sub) return false
      return true
    })
  }, [allItems, major, sub])

  const pickMajor = (m) => { setMajor(m); setSub('all') }

  return (
    <section>
      <div className="page-heading">
        <h1>作品 & 重要事件</h1>
        <p>音乐 · 舞见 · 演出 · 综艺与经历 —— 点击任一条目查看详情</p>
      </div>

      <WorksChart />

      {/* 大类 Tab */}
      <div className="works-majors" role="tablist">
        <button className={`major-tab${major === 'all' ? ' active' : ''}`} onClick={() => pickMajor('all')}>
          全部 <span className="filter-chip-count">{majorCounts.all}</span>
        </button>
        {Object.entries(MAJORS).filter(([key]) => key !== 'life').map(([key, m]) => (
          <button
            key={key}
            className={`major-tab cat-${key}${major === key ? ' active' : ''}`}
            onClick={() => pickMajor(key)}
          >
            {m.label} <span className="filter-chip-count">{majorCounts[key] || 0}</span>
          </button>
        ))}
      </div>

      {/* 小类筛选 */}
      {subOptions.length > 0 && (
        <div className="works-subs">
          <button className={`sub-chip${sub === 'all' ? ' active' : ''}`} onClick={() => setSub('all')}>
            全部
          </button>
          {subOptions.map(o => (
            <button
              key={o.key}
              className={`sub-chip${sub === o.key ? ' active' : ''}`}
              onClick={() => setSub(o.key)}
            >
              {o.label} {o.count}
            </button>
          ))}
        </div>
      )}

      <div className="works-grid">
        {list.map((it, i) => (
          <MotionLink
            to={`/item/${it.id}`}
            className={`work-card cat-${it.cat}`}
            key={it.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.03 }}
          >
            <div className="work-cover">
              <span className="work-cover-icon">{CAT_ICON[it.cat] || '◆'}</span>
              <span className="work-cover-year">{it.year}</span>
            </div>
            <div className="work-body">
              <div className="work-cat-row">
                <span className="work-cat-name">{MAJORS[it.cat]?.label}</span>
                {MAJORS[it.cat]?.subs?.[it.sub] && (
                  <span className="work-sub-name">{MAJORS[it.cat].subs[it.sub]}</span>
                )}
              </div>
              <div className="work-title">{it.title}</div>
              <div className="work-meta">{it.body}</div>
              {it.tags && it.tags.length > 0 && (
                <div className="work-tags">
                  {it.tags.slice(0, 3).map(t => <span key={t} className="work-tag">#{t}</span>)}
                </div>
              )}
            </div>
          </MotionLink>
        ))}
      </div>
    </section>
  )
}
