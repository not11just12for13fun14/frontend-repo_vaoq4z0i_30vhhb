import React from 'react'
import Roadmap from './components/Roadmap'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="relative">
          <Roadmap />
        </div>
      </div>
    </div>
  )
}

export default App