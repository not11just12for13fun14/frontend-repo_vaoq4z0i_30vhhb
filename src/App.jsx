import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Roadmap from './components/Roadmap'

function Coin({ size = 22 }) {
  return (
    <div
      className="relative rounded-full"
      style={{ width: size, height: size, background: 'linear-gradient(145deg, #60a5fa, #22d3ee)', boxShadow: '0 0 16px rgba(56,189,248,0.45), inset 0 0 8px rgba(255,255,255,0.35)' }}
    >
      <div className="absolute inset-[20%] rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), rgba(255,255,255,0.1) 60%, transparent 70%)' }} />
      <div className="absolute inset-[35%] rounded-full" style={{ boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.5)' }} />
    </div>
  )
}

function App() {
  const [coins, setCoins] = useState(124)
  const [flights, setFlights] = useState([]) // {id, x, y, amount}
  const [target, setTarget] = useState({ x: 0, y: 0 })
  const targetRef = useRef(null)

  // track target position (top bar coin) for flights
  useEffect(() => {
    const update = () => {
      const r = targetRef.current?.getBoundingClientRect()
      if (r) setTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [])

  const handleAwardCoins = ({ x, y, amount }) => {
    const id = `${Date.now()}-${Math.random()}`
    setFlights(prev => [...prev, { id, x, y, amount }])
    // we increment near the end to sync with flight arrival
    setTimeout(() => setCoins(c => c + amount), 650)
    setTimeout(() => setFlights(prev => prev.filter(f => f.id !== id)), 900)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top bar with AV Coins */}
      <div className="sticky top-0 z-50">
        <div className="backdrop-blur-xl bg-slate-900/70 border-b border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
            <div className="text-white font-semibold tracking-tight">AV Academy</div>
            <div className="flex items-center gap-3 text-white">
              <div ref={targetRef} className="flex items-center gap-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10">
                <Coin size={18} />
                <span className="text-sm"><span className="text-blue-300 font-semibold">{coins}</span> <span className="text-white/75">AV Coins</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flights layer */}
      <AnimatePresence>
        {flights.map(f => (
          <motion.div
            key={f.id}
            className="fixed pointer-events-none z-[60]"
            initial={{ x: f.x, y: f.y, scale: 0.9, opacity: 1 }}
            animate={{ x: target.x, y: target.y, scale: 0.6, opacity: 0.2 }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
          >
            <Coin size={20} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating +amount labels */}
      <AnimatePresence>
        {flights.map(f => (
          <motion.div
            key={`label-${f.id}`}
            className="fixed pointer-events-none z-[60] text-cyan-200 font-semibold"
            initial={{ x: f.x + 12, y: f.y - 8, opacity: 0, scale: 0.9 }}
            animate={{ x: f.x + 12, y: f.y - 26, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: f.y - 40 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ textShadow: '0 0 10px rgba(56,189,248,0.5)' }}
          >
            +{f.amount} AV Coins
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="relative">
          <Roadmap onAwardCoins={handleAwardCoins} />
        </div>
      </div>
    </div>
  )
}

export default App
