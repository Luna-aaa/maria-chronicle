import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getItemById, MAJORS, catList, primaryCat, normPhoto } from '../data/years.js'

export default function ItemDetail() {
  const { id } = useParams()
  const item = getItemById(id)

  useEffect(() => { window.scrollTo({ top: 0 }) }, [id])

  if (!item) {
    return (
      <section className="item-detail">
        <Link to="/biography" className="year-back">← 返回时间轴</Link>
        <div className="year-empty">未找到该条目（{id}）。</div>
      </section>
    )
  }

  const cats = catList(item)
  const subCat = cats.find(c => MAJORS[c]?.subs?.[item.sub])
  const subLabel = subCat ? MAJORS[subCat].subs[item.sub] : null
  const media = item.media || {}

  return (
    <section className={`item-detail cat-${primaryCat(item)}`}>
      <div className="item-detail-crumbs">
        <Link to="/biography" className="year-back">← 时间轴</Link>
        <Link to={`/biography/${item.year}`} className="year-back">{item.year} 年</Link>
      </div>

      <div className="item-detail-head">
        <div className="item-detail-meta">
          {cats.map(c => (
            <span key={c} className={`item-cat-chip cat-${c}`}>{MAJORS[c]?.label || c}</span>
          ))}
          {subLabel && <span className={`item-sub-chip cat-${subCat}`}>{subLabel}</span>}
          <span className="item-detail-date">{item.year} · {item.date}</span>
        </div>
        <h1 className="item-detail-title">
          {item.highlight && <span className="year-event-star">★</span>}
          {item.title}
        </h1>
        {item.tags && item.tags.length > 0 && (
          <div className="item-detail-tags">
            {item.tags.map(t => <span key={t} className="year-event-tag">#{t}</span>)}
          </div>
        )}
      </div>

      {item.body && <p className="item-detail-body">{item.body}</p>}

      {/* 媒体版位 —— 后续填充音乐 / 视频 / 照片 */}
      {media.audio && (
        <div className="item-media">
          <h3>音乐</h3>
          {media.audio}
        </div>
      )}
      {media.video && (
        <div className="item-media">
          <h3>视频</h3>
          {media.video}
        </div>
      )}
      {media.photos && media.photos.length > 0 && (
        <div className="item-media">
          <h3>照片</h3>
          <div className="item-photos">
            {media.photos.map(normPhoto).map((p, i) => (
              <figure key={i} className="item-photo">
                <img src={p.src} alt={p.caption || `${item.title} ${i + 1}`} loading="lazy" />
                {p.caption && <figcaption>{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      )}
      {media.links && media.links.length > 0 && (
        <div className="item-media">
          <h3>相关链接</h3>
          <ul className="item-links">
            {media.links.map((l, i) => (
              <li key={i}><a href={l.url} target="_blank" rel="noreferrer">{l.label} →</a></li>
            ))}
          </ul>
        </div>
      )}
      {!media.audio && !media.video && !(media.photos && media.photos.length) && !(media.links && media.links.length) && (
        <div className="item-media-placeholder">音乐 / 视频 / 照片等内容待补充</div>
      )}
    </section>
  )
}
