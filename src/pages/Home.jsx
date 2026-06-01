import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FACTS = [
  { label: '出生',     value: '1992.01.31', sub: '茨城县土浦市' },
  { label: '艺名',     value: 'MARiA',      sub: '美依礼芽 · 水桥舞' },
  { label: '主流出道', value: '2014.03.05', sub: 'GARNiDELiA《ambiguous》' },
  { label: '在华破圈', value: '2023',       sub: '《乘风2023》断层一位' },
  { label: '组合停摆', value: '2025.09.02', sub: 'GARNiDELiA 无限期停止' }
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ✦ A CHRONICLE OF MARiA ✦
        </motion.div>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          美依礼芽
        </motion.h1>
        <motion.div
          className="hero-title-en"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          M A R i A
        </motion.div>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          从茨城少女，到 GARNiDELiA 的紫红女王，再到中国乐迷心中的「芽芽」——
          <br />本站按时间顺序记录她走过的每一段路。
        </motion.p>
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link to="/biography" className="btn btn-primary">进入时间轴 →</Link>
          <Link to="/works" className="btn">浏览作品</Link>
        </motion.div>
      </section>

      <section className="facts">
        {FACTS.map((f, i) => (
          <motion.div
            className="fact-card"
            key={f.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
          >
            <div className="fact-label">{f.label}</div>
            <div className="fact-value">{f.value}</div>
            <div className="fact-sub">{f.sub}</div>
          </motion.div>
        ))}
      </section>
    </>
  )
}
