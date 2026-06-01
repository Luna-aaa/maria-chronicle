import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <NavLink to="/" className="site-logo">美依礼芽 · MARiA</NavLink>
        <nav className="site-nav">
          <NavLink to="/" end>首页</NavLink>
          <NavLink to="/biography">生平</NavLink>
          <NavLink to="/works">作品</NavLink>
          <NavLink to="/about">关于</NavLink>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
