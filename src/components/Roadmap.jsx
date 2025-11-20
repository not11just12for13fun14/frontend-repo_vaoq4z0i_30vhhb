import React from 'react'
import { motion } from 'framer-motion'
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
  DollarSign
} from 'lucide-react'

const milestones = [
  { id: 1, title: 'Email y WhatsApp de Bienvenida', icon: Mail, accent: 'from-sky-400 to-blue-500' },
  { id: 2, title: 'Formulario de Onboarding', icon: FileText, accent: 'from-indigo-400 to-violet-500' },
  { id: 3, title: 'Llamada de Onboarding', icon: Phone, accent: 'from-fuchsia-400 to-pink-500' },
  { id: 4, title: 'Producto Ganador', icon: Trophy, accent: 'from-amber-400 to-orange-500' },
  { id: 5, title: 'Elegido Proveedor', icon: Package, accent: 'from-emerald-400 to-teal-500' },
  { id: 6, title: 'Confirmado Tienda Creada', icon: Store, accent: 'from-cyan-400 to-sky-500' },
  { id: 7, title: 'Business Manager Creado', icon: Briefcase, accent: 'from-blue-400 to-indigo-500' },
  { id: 8, title: 'Primeros ADS Subidos', icon: Megaphone, accent: 'from-purple-400 to-fuchsia-500' },
  { id: 9, title: '🔥 Primera Venta', icon: Flame, accent: 'from-rose-400 to-red-500' },
  { id: 10, title: '😍 $1.000USD Facturación', icon: DollarSign, accent: 'from-green-400 to-emerald-500' },
]

const Step = ({ index, title, Icon, accent, side }) => {
  const isLeft = side === 'left'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`relative w-full flex ${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`w-[48%] ${isLeft ? 'pr-6' : 'pl-6'} `}>
        <div className={`group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]` }>
          <div className="flex items-center gap-3">
            <div className={`shrink-0 p-2.5 rounded-xl bg-gradient-to-br ${accent} text-white shadow-[0_8px_20px_rgba(59,130,246,0.35)]` }>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium leading-tight">{title}</p>
              <p className="text-xs text-white/60">Hito {index + 1}</p>
            </div>
          </div>
          <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'right-[-14px]' : 'left-[-14px]'} w-3 h-3 rounded-full bg-white/80 border border-white/30`}></div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Roadmap() {
  const height = milestones.length * 160
  return (
    <div className="relative w-full">
      {/* Scene background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_60%)]" />
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
            Tu Camino de Éxito
          </h1>
          <p className="text-sm sm:text-base text-blue-200/80 max-w-2xl mx-auto">
            Un mapa visual, simple e intuitivo, para ver cada paso del programa como si caminaras por un terreno con hitos claros.
          </p>
        </motion.div>

        {/* Trail container */}
        <div className="relative" style={{ height }}>
          {/* Curved path */}
          <svg className="absolute left-1/2 -translate-x-1/2 h-full" width="520" height={height} viewBox={`0 0 520 ${height}`} fill="none">
            <defs>
              <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* wavy descending spline */}
            {Array.from({ length: milestones.length }).map((_, i) => {
              const y1 = i * 160 + 40
              const y2 = (i + 1) * 160
              const left = i % 2 === 0
              const x1 = 260 + (left ? -140 : 140)
              const x2 = 260 + (left ? 140 : -140)
              const cx1 = 260
              const cx2 = 260
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} C ${cx1} ${y1 + 40}, ${cx2} ${y2 - 40}, ${x2} ${y2}`}
                  stroke="url(#pathGrad)"
                  strokeWidth="4"
                  className="opacity-70"
                  filter="url(#glow)"
                />
              )
            })}

            {/* Dotted center line for depth */}
            <line x1="260" y1="0" x2="260" y2={height} stroke="rgba(255,255,255,0.08)" strokeDasharray="6 10" />
          </svg>

          {/* Steps */}
          <div className="absolute inset-0">
            {milestones.map((m, i) => (
              <div key={m.id} className="absolute left-0 top-0 w-full" style={{ top: i * 160 }}>
                <Step index={i} title={m.title} Icon={m.icon} accent={m.accent} side={i % 2 === 0 ? 'left' : 'right'} />
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-200/80 text-sm">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white/70 inline-block"></span> Cada punto es un hito alcanzable con instrucciones claras.</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 inline-block"></span> La ruta muestra el avance descendente, paso a paso.</div>
        </div>
      </div>
    </div>
  )
}
