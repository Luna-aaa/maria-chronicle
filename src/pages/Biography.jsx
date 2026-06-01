import Timeline from '../components/Timeline.jsx'
import { biography } from '../data/biography.js'

export default function Biography() {
  return (
    <section>
      <div className="page-heading">
        <h1>生平时间线</h1>
        <p>按时间顺序记录美依礼芽从童年到今日的关键节点</p>
      </div>
      <Timeline events={biography} />
    </section>
  )
}
