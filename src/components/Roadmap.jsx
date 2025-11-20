import React, { useState, useMemo } from 'react'
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
  Flag
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
  // Pequeños adornos: nubes, estrellitas y banderines en el camino
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

const Checkpoint = ({ index, title, Icon, accent, side, open, onToggle, steps }) => {
  const isLeft = side === 'left'
  return (
    <div className={`relative w-full flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
      <div className={`w-[48%] ${isLeft ? 'pr-6' : 'pl-6'}`}>
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`group relative w-full text-left rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] overflow-hidden`}
        >
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${isLeft ? 'from-white/5 to-transparent' : 'from-transparent to-white/5'}`} />
          <div className="relative flex items-center gap-3">
            <div className={`shrink-0 p-2.5 rounded-xl bg-gradient-to-br ${accent} text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)]` }>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold leading-tight">{title}</p>
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
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-500/90 text-white text-xs font-medium hover:bg-emerald-500 transition">Marcar como hecho</button>
                  <button className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs hover:bg-white/15 transition">Ver recursos</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Node del camino */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'right-[-14px]' : 'left-[-14px]'} w-3 h-3 rounded-full bg-white/90 border border-white/30 shadow-[0_0_0_6px_rgba(255,255,255,0.08)]`}></div>
    </div>
  )
}

export default function Roadmap() {
  const [openId, setOpenId] = useState(null)
  const height = milestones.length * 180

  return (
    <div className="relative w-full">
      {/* Fondo */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_60%)]" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.12),transparent_35%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-12 sm:pt-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            Tu Caminito de Éxito
          </h1>
          <p className="text-sm sm:text-base text-blue-200/80 max-w-2xl mx-auto">
            Un camino divertido y claro. Tocá cada checkpoint para ver el paso a paso.
          </p>
        </motion.div>

        {/* Escena del camino */}
        <div className="relative" style={{ height }}>
          {/* Caminito SVG más "zarpado" */}
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
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Bordes del caminito (cinta) */}
            {Array.from({ length: milestones.length }).map((_, i) => {
              const y1 = i * 180 + 40
              const y2 = (i + 1) * 180
              const left = i % 2 === 0
              const xCenter = 280
              const x1 = xCenter + (left ? -150 : 150)
              const x2 = xCenter + (left ? 150 : -150)
              const cx1 = xCenter
              const cx2 = xCenter
              return (
                <g key={`band-${i}`} filter="url(#softGlow)">
                  <path d={`M ${x1-10} ${y1} C ${cx1-10} ${y1 + 50}, ${cx2-10} ${y2 - 50}, ${x2-10} ${y2}`} stroke="url(#borderGrad)" strokeOpacity="0.25" strokeWidth="10" />
                  <path d={`M ${x1+10} ${y1} C ${cx1+10} ${y1 + 50}, ${cx2+10} ${y2 - 50}, ${x2+10} ${y2}`} stroke="url(#borderGrad)" strokeOpacity="0.25" strokeWidth="10" />
                </g>
              )
            })}

            {/* Centro brillante del camino */}
            {Array.from({ length: milestones.length }).map((_, i) => {
              const y1 = i * 180 + 40
              const y2 = (i + 1) * 180
              const left = i % 2 === 0
              const xCenter = 280
              const x1 = xCenter + (left ? -150 : 150)
              const x2 = xCenter + (left ? 150 : -150)
              const cx1 = xCenter
              const cx2 = xCenter
              return (
                <path
                  key={`center-${i}`}
                  d={`M ${x1} ${y1} C ${cx1} ${y1 + 50}, ${cx2} ${y2 - 50}, ${x2} ${y2}`}
                  stroke="url(#trailGrad)"
                  strokeWidth="6"
                  className="opacity-90"
                />
              )
            })}

            {/* Línea punteada animada */}
            <motion.line
              x1="280" y1="0" x2="280" y2={height}
              stroke="rgba(255,255,255,0.12)"
              strokeDasharray="6 10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6 }}
            />

            {/* Bolita que recorre lentamente el camino (ornamental) */}
            <motion.circle r="5" fill="#22D3EE" filter="url(#softGlow)"
              animate={{ cy: [0, height], opacity: [0.8, 0.4, 0.8] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              cx="280"
            />
          </svg>

          {/* Adornos */}
          <CuteDeco height={height} />

          {/* Checkpoints */}
          <div className="absolute inset-0">
            {milestones.map((m, i) => (
              <div key={m.id} className="absolute left-0 top-0 w-full" style={{ top: i * 180 }}>
                <Checkpoint
                  index={i}
                  title={m.title}
                  Icon={m.icon}
                  accent={m.accent}
                  steps={m.steps}
                  side={i % 2 === 0 ? 'left' : 'right'}
                  open={openId === m.id}
                  onToggle={() => setOpenId(openId === m.id ? null : m.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-200/80 text-sm">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white/70 inline-block"></span> Cada checkpoint se abre con un paso a paso corto.</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 inline-block"></span> El caminito es interactivo, suave y con brillo.</div>
        </div>
      </div>
    </div>
  )
}
