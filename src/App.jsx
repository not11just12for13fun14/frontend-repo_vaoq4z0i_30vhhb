import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Roadmap from './components/Roadmap'

function Coin({ size = 22, intense = false }) {
  const outerGlow = intense ? '0 0 28px rgba(56,189,248,0.75), 0 0 60px rgba(59,130,246,0.45)' : '0 0 16px rgba(56,189,248,0.45)'
  return (
    <div
      className="relative rounded-full"
      style={{ width: size, height: size, background: 'linear-gradient(145deg, #60a5fa, #22d3ee)', boxShadow: `${outerGlow}, inset 0 0 10px rgba(255,255,255,0.45)` }}
    >
      <div className="absolute inset-[16%] rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.75), rgba(255,255,255,0.15) 60%, transparent 70%)' }} />
      <div className="absolute inset-[32%] rounded-full" style={{ boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.65)' }} />
      {/* ranuras */}
      <div className="absolute left-[28%] top-[26%] h-[48%] w-[12%] rounded-full bg-white/20" />
      <div className="absolute right-[28%] top-[26%] h-[48%] w-[12%] rounded-full bg-white/10" />
    </div>
  )
}

const API_BASE = import.meta.env.VITE_BACKEND_URL

function App() {
  const [coins, setCoins] = useState(124)
  const [flights, setFlights] = useState([]) // {id, x, y, amount}
  const [target, setTarget] = useState({ x: 0, y: 0 })
  const targetRef = useRef(null)

  // auth
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loadingMe, setLoadingMe] = useState(false)
  const [counterPulseKey, setCounterPulseKey] = useState(0)

  useEffect(() => {
    const t = localStorage.getItem('av_token')
    if (t) {
      setToken(t)
    }
  }, [])

  useEffect(() => {
    const fetchMe = async () => {
      if (!token || !API_BASE) return
      try {
        setLoadingMe(true)
        const res = await fetch(`${API_BASE}/me`, { headers: { Authorization: `Bearer ${token}` } })
        if (res.ok) {
          const data = await res.json()
          setCoins(data.coins ?? 0)
          setEmail(data.email)
          setName(data.name || '')
        } else if (res.status === 401) {
          localStorage.removeItem('av_token')
          setToken(null)
        }
      } catch (e) {
        // ignore for now
      } finally {
        setLoadingMe(false)
      }
    }
    fetchMe()
  }, [token])

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

  const triggerCounterPulse = () => {
    setCounterPulseKey(k => k + 1)
  }

  const handleAwardCoins = ({ x, y, amount }) => {
    const id = `${Date.now()}-${Math.random()}`
    setFlights(prev => [...prev, { id, x, y, amount }])
    // bump UI coins soon to sync with arrival and pulse the counter
    setTimeout(() => {
      setCoins(c => c + amount)
      triggerCounterPulse()
    }, 650)
    setTimeout(() => setFlights(prev => prev.filter(f => f.id !== id)), 1000)

    // persist to backend if logged
    if (token && API_BASE) {
      setTimeout(async () => {
        try {
          const res = await fetch(`${API_BASE}/coins/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ amount })
          })
          if (res.ok) {
            const data = await res.json()
            setCoins(data.coins)
          }
        } catch (_) {}
      }, 650)
    }
  }

  const handleLogin = async (e) => {
    e?.preventDefault?.()
    if (!API_BASE) {
      alert('Configura VITE_BACKEND_URL para habilitar login.')
      return
    }
    if (!email) return
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      })
      if (!res.ok) throw new Error('login failed')
      const data = await res.json()
      setToken(data.token)
      localStorage.setItem('av_token', data.token)
      setCoins(data.coins ?? 0)
      setName(data.name || '')
    } catch (e) {
      alert('No se pudo iniciar sesión')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('av_token')
    setToken(null)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top bar with AV Coins */}
      <div className="sticky top-0 z-50">
        <div className="backdrop-blur-xl bg-slate-900/70 border-b border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
            <div className="text-white font-semibold tracking-tight">AV Academy</div>

            {!token ? (
              <form onSubmit={handleLogin} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
                <input
                  type="text"
                  placeholder="Nombre (opcional)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="hidden sm:block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-white text-sm">Iniciar sesión</button>
              </form>
            ) : (
              <div className="flex items-center gap-3 text-white">
                <motion.div
                  key={counterPulseKey}
                  initial={{ scale: 1, boxShadow: '0 0 0 rgba(59,130,246,0)' }}
                  animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 0 rgba(59,130,246,0)', '0 0 32px rgba(56,189,248,0.55)', '0 0 0 rgba(59,130,246,0)'] }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  ref={targetRef}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10"
                >
                  <Coin size={20} intense />
                  <span className="text-sm"><span className="text-blue-300 font-semibold">{coins}</span> <span className="text-white/75">AV Coins</span></span>
                </motion.div>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs text-white/70 leading-none">{name || email}</span>
                  <button onClick={handleLogout} className="text-[11px] text-white/50 hover:text-white/80">Salir</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flights layer */}
      <AnimatePresence>
        {flights.map(f => (
          <motion.div
            key={f.id}
            className="fixed pointer-events-none z-[60]"
            initial={{ x: f.x, y: f.y, scale: 1.15, opacity: 1, rotate: 0 }}
            animate={{ x: target.x, y: target.y, scale: 0.7, opacity: 0.15, rotate: 12 }}
            transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.div initial={{ filter: 'blur(0px)' }} animate={{ filter: ['blur(0px)', 'blur(0.6px)'] }} transition={{ duration: 0.75 }}>
              <Coin size={32} intense />
            </motion.div>
            {/* pequeño rastro */}
            <div className="absolute -z-10 -inset-4 rounded-full" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.35), rgba(56,189,248,0.12) 50%, transparent 70%)' }} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating +amount labels */}
      <AnimatePresence>
        {flights.map(f => (
          <motion.div
            key={`label-${f.id}`}
            className="fixed pointer-events-none z-[60] text-cyan-200 font-semibold"
            initial={{ x: f.x + 14, y: f.y - 10, opacity: 0, scale: 0.9 }}
            animate={{ x: f.x + 14, y: f.y - 32, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: f.y - 48 }}
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
