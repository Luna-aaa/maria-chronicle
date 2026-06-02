import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BackgroundFX from './components/BackgroundFX.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import BackToTop from './components/BackToTop.jsx'
import Home from './pages/Home.jsx'
import Biography from './pages/Biography.jsx'
import YearDetail from './pages/YearDetail.jsx'
import Works from './pages/Works.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <BackgroundFX />
      <ScrollProgress />
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/biography" element={<Biography />} />
          <Route path="/biography/:year" element={<YearDetail />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
