import React, { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  FileText,
  Trophy,
  Package,
  Store,
  Briefcase,
  Megaphone,
  Flame,
  DollarSign,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Flag,
  CheckCircle,
  Sparkles
} from 'lucide-react'

const milestones = [
  { id: 1, title: 'Email y WhatsApp de Bienvenida', icon: Mail, accent: 'from-sky-400 to-blue-500', steps: [
    'Revisá el email de bienvenida y guardá el contacto',
    'Respondé el mensaje de WhatsApp con “Listo”',
    'Agendá la fecha de inicio en tu calendario'
  ]},
  { id: 2, title: 'Formulario de Onboarding', icon: FileText, accent: 'from-indigo-400 to-violet-500', steps: [
    'Completá el formulario con tus datos',
    'Adjuntá logos y recursos de marca',
    'Confirmá los objetivos del primer mes'
  ]},
  { id: 3, title: 'Llamada de Onboarding', icon: Phone, accent: 'from-fuchsia-400 to-pink-500', steps: [
    'Coordiná horario en el link de agenda',
    'Tené a mano tus accesos (tienda, BM, etc.)',
    'Definimos métricas y próximos pasos'
  ]},
  { id: 4, title: 'Producto Ganador', icon: Trophy, accent: 'from-amber-400 to-orange-500', steps: [
    'Analizamos catálogo y márgenes',
    'Elegimos 1-3 productos foco',
    'Definimos propuesta de valor'
  ]},
  { id: 5, title: 'Elegido Proveedor', icon: Package, accent: 'from-emerald-400 to-teal-500', steps: [
    'Validamos stock y tiempos de envío',
    'Negociamos precio y MOQs',
    'Confirmamos método logístico'
  ]},
  { id: 6, title: 'Confirmado Tienda Creada', icon: Store, accent: 'from-cyan-400 to-sky-500', steps: [
    'Publicamos el producto con fotos y fichas',
    'Configuramos pasarela de pago',
    'Testeamos checkout end-to-end'
  ]},
  { id: 7, title: 'Business Manager Creado', icon: Briefcase, accent: 'from-blue-400 to-indigo-500', steps: [
    'Creamos BM y cuentas publicitarias',
    'Instalamos píxel y eventos',
    'Verificamos dominio y conversiones'
  ]},
  { id: 8, title: 'Primeros ADS Subidos', icon: Megaphone, accent: 'from-purple-400 to-fuchsia-500', steps: [
    'Diseñamos 3-5 creatividades',
    'Armamos 2-3 audiencias de test',
    'Publicamos campaña con budget diario'
  ]},
  { id: 9, title: '🔥 Primera Venta', icon: Flame, accent: 'from-rose-400 to-red-500', steps: [
    'Monitoreamos costo por compra',
    'Optimización rápida: creatividades y pujas',
    'Agradecé al primer cliente con mensaje'
  ]},
  { id: 10, title: '😍 $1.000USD Facturación', icon: DollarSign, accent: 'from-green-400 to-emerald-500', steps: [
    'Escalamos campañas ganadoras',
    'Sistematizamos atención y fulfilment',
    'Revisión de métricas y plan del próximo tramo'
  ]},
]

const CuteDeco = ({ height }) => {
  const deco = useMemo(() => Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: (i + 1) * (height / 14),
    size: 10 + Math.random() * 18,
    type: i % 3
  })), [height])
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {deco.map(d => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.8, delay: d.id * 0.05 }}
          className="absolute"
          style={{ left: `${d.x}%`, top: d.y - d.size }}
        >
          {d.type === 0 && (
            <div className="opacity-80">
              <div className="w-16 h-10 bg-white/10 rounded-full blur-sm" />
            </div>
          )}
          {d.type === 1 && (
            <div className="w-2 h-2 bg-white/50 rotate-45" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.4)' }} />
          )}
          {d.type === 2 && (
            <div className="flex items-center gap-1">
              <Flag className="w-3 h-3 text-emerald-300" />
              <div className="w-6 h-[2px] bg-gradient-to-r from-emerald-300/50 to-transparent" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

// Confeti: explosión y desvanecimiento (sin deriva lateral secundaria)
const ConfettiBurst = ({ y }) => {
  const count = 50
  const pieces = useMemo(() => Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2
    const radius = 90 + Math.random() * 110
    const hue = 180 + Math.random() * 180
    const w = 6 + Math.random() * 10
    const h = 10 + Math.random() * 14
    const rot = 180 + Math.random() * 540
    return {
      id: i,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      hue,
      w,
      h,
      rot,
      delay: Math.random() * 0.04
    }
  }), [])
  return (
    <div className="pointer-events-none absolute left-0 w-full" style={{ top: y }}>
      <div className="relative" style={{ left: '50%' }}>
        {pieces.map(p => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: [1, 1, 0.6, 0], x: p.x, y: p.y, scale: [0.9, 1.05, 1], rotate: p.rot }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: p.delay }}
            style={{
              background: `linear-gradient(180deg, hsl(${p.hue} 95% 62%) 0%, hsl(${p.hue + 30} 95% 58%) 100%)`,
              width: p.w,
              height: p.h,
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.45))',
            }}
            className="inline-block absolute rounded-[2px]"
          />)
        )}
      </div>
    </div>
  )
}

// Utilidad: aleatorio entre rangos
const rand = (min, max) => min + Math.random() * (max - min)

// Fireworks a pantalla completa, asimétricos y gigantes
const EdgeFireworks = ({ id }) => {
  const viewport = useMemo(() => {
    if (typeof window === 'undefined') return { w: 1200, h: 800 }
    return { w: window.innerWidth, h: window.innerHeight }
  }, [id])

  // Genera centros en distintas zonas (incluye bordes y medio) con separación básica
  const spots = useMemo(() => {
    const n = 6 + Math.floor(Math.random() * 4) // 6–9 ráfagas
    const arr = []
    let guard = 0
    while (arr.length < n && guard < 200) {
      guard++
      const x = rand(8, 92) // en % para dispersión amplia
      const y = rand(8, 92)
      if (arr.every(s => (Math.hypot(s.x - x, s.y - y) > 14))) {
        arr.push({ x, y })
      }
    }
    // empujar algunos bien al borde para sensación "Disney"
    const edges = [
      { x: rand(2, 6), y: rand(10, 90) },
      { x: rand(94, 98), y: rand(10, 90) },
      { x: rand(10, 90), y: rand(2, 6) },
      { x: rand(10, 90), y: rand(94, 98) },
    ]
    return [...arr.slice(0, n - 2), ...edges.slice(0, 2 + Math.floor(Math.random() * 2))]
  }, [id])

  // Parámetros gigantes: radios muy grandes en px según viewport
  const rMax = Math.max(viewport.w, viewport.h) * 0.46 // casi media pantalla
  const rMin = rMax * 0.55

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      {spots.map((s, idx) => (
        <div key={idx} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
          {/* fogonazo inicial */}
          <motion.div
            initial={{ opacity: 0.9, scale: 0 }}
            animate={{ opacity: [0.9, 0.5, 0], scale: [0, 1.6, 2.2] }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 120, height: 120, background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0) 70%)' }}
          />

          {Array.from({ length: 48 + Math.floor(Math.random() * 48) }).map((_, i) => {
            // ángulos y distancias no proporcionales para sensación dispareja
            const angle = Math.random() * Math.PI * 2
            const dist = rand(rMin * 0.6, rMax) * (Math.random() * 0.9 + 0.4)
            const size = rand(6, 11)
            const hue = rand(0, 360)
            const delay = Math.random() * 0.08
            const dur = rand(1.4, 2.1)
            const wobble = rand(-30, 30)
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.8 }}
                animate={{
                  x: Math.cos(angle) * dist + Math.cos(angle + Math.PI / 2) * wobble,
                  y: Math.sin(angle) * dist + Math.sin(angle + Math.PI / 2) * wobble,
                  opacity: [1, 1, 0.85, 0],
                  scale: [0.8, 1.15, 0.95]
                }}
                transition={{ duration: dur, ease: 'easeOut', delay }}
                style={{
                  background: `linear-gradient(180deg, hsl(${hue} 95% 64%) 0%, hsl(${(hue + 22) % 360} 95% 58%) 100%)`,
                  width: size,
                  height: size,
                  filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))'
                }}
                className="absolute rounded-sm"
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

// Show final a pantalla completa, grande y con varias olas
const FireworkShow = ({ show }) => {
  const viewport = useMemo(() => {
    if (typeof window === 'undefined') return { w: 1200, h: 800 }
    return { w: window.innerWidth, h: window.innerHeight }
  }, [show])

  const bursts = useMemo(() => Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    x: 6 + Math.random() * 88,
    y: 8 + Math.random() * 70,
    count: 80 + Math.floor(Math.random() * 60),
    hue: Math.floor(Math.random() * 360),
    delayBase: Math.random() * 0.6
  })), [])

  if (!show) return null

  const rMax = Math.max(viewport.w, viewport.h) * 0.5
  const rMin = rMax * 0.5

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[65]">
      {bursts.map(b => (
        <div key={b.id} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
          {/* flash */}
          <motion.div
            initial={{ opacity: 0.95, scale: 0 }}
            animate={{ opacity: [0.95, 0.4, 0], scale: [0, 1.8, 2.4] }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: b.delayBase }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 160, height: 160, background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0) 70%)' }}
          />

          {Array.from({ length: b.count }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2
            const dist = rand(rMin * 0.7, rMax) * (Math.random() * 1.1 + 0.3)
            const hue = (b.hue + rand(-30, 30) + i) % 360
            const size = rand(7, 12)
            const delay = b.delayBase + (Math.random() * 0.12)
            const dur = rand(1.6, 2.4)
            const wobble = rand(-36, 36)
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.85 }}
                animate={{
                  x: Math.cos(angle) * dist + Math.cos(angle + Math.PI / 2) * wobble,
                  y: Math.sin(angle) * dist + Math.sin(angle + Math.PI / 2) * wobble,
                  opacity: [1, 1, 0.85, 0],
                  scale: [0.85, 1.2, 1]
                }}
                transition={{ duration: dur, ease: 'easeOut', delay }}
                style={{
                  background: `linear-gradient(180deg, hsl(${hue} 95% 64%) 0%, hsl(${(hue + 22) % 360} 95% 58%) 100%)`,
                  width: size,
                  height: size,
                  filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.8))'
                }}
                className="absolute rounded-sm"
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

const Checkpoint = ({ index, title, Icon, accent, side, open, onToggle, steps, completed, onMarkDone }) => {
  const isLeft = side === 'left'
  return (
    <div className={`relative w-full flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
      <div className={`w-[48%] ${isLeft ? 'pr-6' : 'pl-6'}`}>
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`group relative w-full text-left rounded-2xl border ${completed ? 'border-emerald-400/40' : 'border-white/10'} ${completed ? 'bg-emerald-500/10' : 'bg-white/5'} backdrop-blur-xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] overflow-hidden`}
        >
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${isLeft ? 'from-white/5 to-transparent' : 'from-transparent to-white/5'}`} />
          <div className="relative flex items-center gap-3">
            <motion.div animate={completed ? { scale: [1, 1.1, 1], rotate: [0, -8, 0] } : {}} transition={{ duration: 0.5 }} className={`shrink-0 p-2.5 rounded-xl bg-gradient-to-br ${accent} text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)]` }>
              <Icon className="w-5 h-5" />
            </motion.div>
            <div className="flex-1">
              <p className="text-white font-semibold leading-tight flex items-center gap-2">
                {title}
                {completed && (
                  <span className="inline-flex items-center gap-1 text-emerald-300 text-xs font-medium">
                    <CheckCircle className="w-4 h-4" /> ¡Completado!
                  </span>
                )}
              </p>
              <p className="text-xs text-white/60">Hito {index + 1} • Tocá para ver el paso a paso</p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/60" />
              <motion.span animate={{ rotate: open ? 180 : 0 }}>
                <ChevronDown className="w-5 h-5 text-white/70" />
              </motion.span>
            </div>
          </div>
        </motion.button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className={`overflow-hidden ${isLeft ? 'pr-2' : 'pl-2'}`}
            >
              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-sm text-blue-100/90">
                <ul className="space-y-2">
                  {steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-300" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  <motion.button
                    onClick={onMarkDone}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    disabled={completed}
                    className={`px-3 py-1.5 rounded-lg text-white text-xs font-medium transition ${completed ? 'bg-emerald-500/60 cursor-default' : 'bg-emerald-500/90 hover:bg-emerald-500'}`}
                  >
                    {completed ? '¡Hecho!' : 'Marcar como hecho'}
                  </motion.button>
                  <button className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs hover:bg-white/15 transition">Ver recursos</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nodo del camino */}
      <motion.div
        animate={completed ? { scale: [1, 1.3, 1], boxShadow: ['0 0 0 6px rgba(255,255,255,0.08)', '0 0 0 10px rgba(16,185,129,0.25)', '0 0 0 6px rgba(255,255,255,0.08)'] } : {}}
        className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'right-[-14px]' : 'left-[-14px]'} w-3 h-3 rounded-full ${completed ? 'bg-emerald-300' : 'bg-white/90'} border ${completed ? 'border-emerald-400/70' : 'border-white/30'} shadow-[0_0_0_6px_rgba(255,255,255,0.08)]`}
      />
    </div>
  )
}

export default function Roadmap() {
  const [openId, setOpenId] = useState(null)
  const [completedIds, setCompletedIds] = useState([])
  // Permitir múltiples celebraciones simultáneas para que nunca se pierda un confeti
  const [celebrates, setCelebrates] = useState([]) // [{ key, y }]
  const [edgeBursts, setEdgeBursts] = useState([]) // [{ key }]
  const [showGrand, setShowGrand] = useState(false)
  const baseHeight = milestones.length * 180
  const tail = showGrand ? 280 : 140
  const height = baseHeight + tail
  const upsellRef = useRef(null)

  const handleMarkDone = (m, index) => {
    if (!completedIds.includes(m.id)) {
      const next = [...completedIds, m.id]
      setCompletedIds(next)

      // Disparo confeti SIEMPRE: agrego un burst a la cola con clave única
      const y = index * 180 + 65
      const key = `${m.id}-${Date.now()}`
      setCelebrates(prev => [...prev, { key, y }])
      // Fuegos gigantes por toda la pantalla
      setEdgeBursts(prev => [...prev, { key }])

      // Abrir siguiente checkpoint si existe
      const nextMilestone = milestones[index + 1]
      if (nextMilestone) setOpenId(nextMilestone.id)

      // Remover cada capa de celebración de forma independiente
      setTimeout(() => setCelebrates(prev => prev.filter(b => b.key !== key)), 2000)
      setTimeout(() => setEdgeBursts(prev => prev.filter(b => b.key !== key)), 2300)
    }
  }

  const completedAll = completedIds.length === milestones.length
  const progress = completedIds.length / milestones.length

  useEffect(() => {
    if (completedAll) {
      setShowGrand(true)
      const t = setTimeout(() => {
        upsellRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 900)
      return () => clearTimeout(t)
    }
  }, [completedAll])

  return (
    <div className="relative w-full">
      {/* Fondo */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_60%)]" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.12),transparent_35%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-12 sm:pt-16">
        {/* Heading + progreso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            Tu Caminito de Éxito
          </h1>
          <p className="text-sm sm:text-base text-blue-200/80 max-w-2xl mx-auto mb-4">
            Un camino divertido y claro. Tocá cada checkpoint para ver el paso a paso.
          </p>
          <div className="mx-auto max-w-xl text-left">
            <div className="flex items-center justify-between text-xs text-blue-200/80 mb-1">
              <span>Progreso</span>
              <span>{completedIds.length}/{milestones.length}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              />
            </div>
            <AnimatePresence>
              {completedIds.length > 0 && !completedAll && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-2 text-emerald-300 text-xs text-center"
                >
                  ¡Seguí así! Cada paso te acerca al objetivo 🚀
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Escena del camino */}
        <div className="relative" style={{ height }}>
          {/* Caminito SVG */}
          <svg className="absolute left-1/2 -translate-x-1/2 h-full" width="560" height={height} viewBox={`0 0 560 ${height}`} fill="none">
            <defs>
              <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
              <linearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* máscara para desvanecer arriba/abajo y evitar cortes bruscos */}
              <linearGradient id="fadeVGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="8%" stopColor="white" stopOpacity="1" />
                <stop offset="92%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="fadeV">
                <rect x="0" y="0" width="560" height={height} fill="url(#fadeVGrad)" />
              </mask>
            </defs>

            <g mask="url(#fadeV)">
              {Array.from({ length: milestones.length }).map((_, i) => {
                const y1 = i * 180 + 60
                const y2 = (i + 1) * 180
                const left = i % 2 === 0
                const xCenter = 280
                const x1 = xCenter + (left ? -150 : 150)
                const x2 = xCenter + (left ? 150 : -150)
                const cx1 = xCenter
                const cx2 = xCenter
                return (
                  <g key={`band-${i}`} filter="url(#softGlow)">
                    <path d={`M ${x1-10} ${y1} C ${cx1-10} ${y1 + 50}, ${cx2-10} ${y2 - 50}, ${x2-10} ${y2}`} stroke="url(#borderGrad)" strokeOpacity="0.25" strokeWidth="12" strokeLinecap="round" />
                    <path d={`M ${x1+10} ${y1} C ${cx1+10} ${y1 + 50}, ${cx2+10} ${y2 - 50}, ${x2+10} ${y2}`} stroke="url(#borderGrad)" strokeOpacity="0.25" strokeWidth="12" strokeLinecap="round" />
                  </g>
                )
              })}

              {Array.from({ length: milestones.length }).map((_, i) => {
                const y1 = i * 180 + 60
                const y2 = (i + 1) * 180
                const left = i % 2 === 0
                const xCenter = 280
                const x1 = xCenter + (left ? -150 : 150)
                const x2 = xCenter + (left ? 150 : -150)
                const cx1 = xCenter
                const cx2 = xCenter
                return (
                  <g key={`center-${i}`}>
                    <path
                      d={`M ${x1} ${y1} C ${cx1} ${y1 + 50}, ${cx2} ${y2 - 50}, ${x2} ${y2}`}
                      stroke="url(#trailGrad)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-95"
                      filter="url(#softGlow)"
                    />
                    {/* tapas circulares para que "se una" con el hito */}
                    <circle cx={x1} cy={y1} r="5" fill="#22D3EE" opacity="0.9" />
                    <circle cx={x2} cy={y2} r="5" fill="#22D3EE" opacity="0.9" />
                  </g>
                )
              })}

              {/* tramo final suave que baja e integra con el upsell */}
              {(() => {
                const i = milestones.length - 1
                const y2 = (i + 1) * 180
                const left = i % 2 === 0
                const xCenter = 280
                const xStart = xCenter + (left ? 150 : -150)
                const yEnd = baseHeight + Math.min(tail - 20, 220)
                return (
                  <g key="final-tail" filter="url(#softGlow)">
                    {/* bordes brillo */}
                    <path d={`M ${xStart-10} ${y2} C ${xCenter-10} ${y2 + 60}, ${xCenter-10} ${yEnd - 60}, ${xCenter-10} ${yEnd}`} stroke="url(#borderGrad)" strokeOpacity="0.22" strokeWidth="12" strokeLinecap="round" />
                    <path d={`M ${xStart+10} ${y2} C ${xCenter+10} ${y2 + 60}, ${xCenter+10} ${yEnd - 60}, ${xCenter+10} ${yEnd}`} stroke="url(#borderGrad)" strokeOpacity="0.22" strokeWidth="12" strokeLinecap="round" />
                    {/* centro */}
                    <path d={`M ${xStart} ${y2} C ${xCenter} ${y2 + 60}, ${xCenter} ${yEnd - 60}, ${xCenter} ${yEnd}`} stroke="url(#trailGrad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx={xStart} cy={y2} r="5" fill="#22D3EE" opacity="0.9" />
                    <circle cx={xCenter} cy={yEnd} r="5" fill="#22D3EE" opacity="0.7" />
                  </g>
                )
              })()}

              {/* guía punteada central sutil con desvanecido */}
              <motion.line
                x1="280" y1="0" x2="280" y2={height}
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray="6 10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />

              {/* bolita ornamental con movimiento más suave y fade en extremos */}
              <motion.circle r="4" fill="#22D3EE" filter="url(#softGlow)"
                animate={{ cy: [-20, height + 20], opacity: [0, 0.6, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                cx="280"
              />
            </g>
          </svg>

          {/* Adornos */}
          <CuteDeco height={height} />

          {/* Confetti de celebración (siempre, por burst) */}
          <AnimatePresence>
            {celebrates.map(b => (
              <motion.div key={b.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ConfettiBurst y={b.y} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Checkpoints */}
          <div className="absolute inset-0">
            {milestones.map((m, i) => (
              <div
                key={m.id}
                className="absolute left-0 top-0 w-full"
                style={{ top: i * 180, zIndex: openId === m.id ? 1000 : (milestones.length - i) }}
              >
                <Checkpoint
                  index={i}
                  title={m.title}
                  Icon={m.icon}
                  accent={m.accent}
                  steps={m.steps}
                  side={i % 2 === 0 ? 'left' : 'right'}
                  open={openId === m.id}
                  onToggle={() => setOpenId(openId === m.id ? null : m.id)}
                  completed={completedIds.includes(m.id)}
                  onMarkDone={() => handleMarkDone(m, i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bloque 10/10: Celebración + Upsell (integrado) */}
        <div ref={upsellRef} className="relative -mt-8">
          <AnimatePresence>
            {showGrand && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative rounded-3xl overflow-hidden bg-white/0 p-0"
              >
                {/* Glow sutil para integrar */}
                <motion.div
                  className="absolute -z-10 inset-0"
                  initial={{ opacity: 0.35 }}
                  animate={{ opacity: [0.35, 0.6, 0.35] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ background: 'radial-gradient(1200px 400px at 20% -10%, rgba(56,189,248,0.18), transparent), radial-gradient(900px 300px at 80% 110%, rgba(99,102,241,0.18), transparent)' }}
                />

                {/* Fuegos Artificiales gigantes */}
                <FireworkShow show={true} />

                <div className="flex flex-col items-center text-center gap-4 pb-16 sm:pb-24">
                  <div className="inline-flex items-center gap-2 text-emerald-300">
                    <Sparkles className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-xs font-semibold">¡Objetivo alcanzado 10/10!</span>
                    <Sparkles className="w-5 h-5" />
                  </div>

                  <motion.h2
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: [0.95, 1.02, 1], opacity: 1 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white"
                  >
                    Escalá a 50M con rentabilidad y estructura
                  </motion.h2>

                  {/* Video placeholder (bloque de ejemplo) */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-full max-w-3xl"
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white border border-white/15"
                        >
                          <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                          Ver video de ejemplo
                        </motion.button>
                      </div>
                      {/* líneas decorativas */}
                      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mt-2"
                  >
                    <a
                      href="#agendar"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-[0_12px_30px_rgba(20,184,166,0.35)] hover:brightness-110 transition"
                    >
                      Agendar Llamada
                    </a>
                  </motion.div>

                  {/* Espacio extra debajo del botón para respirar visualmente */}
                  <div className="h-10 sm:h-16" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer/Leyenda removido para un cierre más limpio e integrado */}
      </div>

      {/* Fuegos en bordes al completar cada hito (capa global) */}
      <AnimatePresence>
        {edgeBursts.map(b => (
          <motion.div key={b.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EdgeFireworks id={b.key} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
