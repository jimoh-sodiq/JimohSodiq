<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number

interface Entity {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  dead?: boolean
  hp?: number
  type: 'station' | 'bug' | 'laser' | 'particle'
  label?: string
}

let entities: Entity[] = []
let station: Entity
let lastSpawn = 0
const SPAWN_RATE = 1500 // ms between spawns

const BUG_TYPES = [
  'NaN', 'undefined', 'null', 'CORS', '404', 'SegFault', 'Panic', 'OOM', 'TODO', '[obj Obj]'
]

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const init = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')

  // Set initial target to center
  targetX = canvas.width / 2
  targetY = canvas.height / 2
  mouseX = targetX
  mouseY = targetY

  // Station (The User/System)
  station = {
    x: targetX,
    y: targetY,
    vx: 0,
    vy: 0,
    size: 20,
    color: '#22d3ee', // Cyan
    type: 'station'
  }
}

const handleMouseMove = (e: MouseEvent) => {
  targetX = e.clientX
  targetY = e.clientY
}

const spawnBug = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  
  // Spawn from random edge
  const edge = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
  let x = 0, y = 0
  
  switch(edge) {
    case 0: x = Math.random() * canvas.width; y = -30; break;
    case 1: x = canvas.width + 30; y = Math.random() * canvas.height; break;
    case 2: x = Math.random() * canvas.width; y = canvas.height + 30; break;
    case 3: x = -30; y = Math.random() * canvas.height; break;
  }

  // Target station
  const angle = Math.atan2(station.y - y, station.x - x)
  const speed = 0.3 + Math.random() * 0.4 // Slow, subtle movement

  entities.push({
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 12 + Math.random() * 4,
    color: Math.random() > 0.5 ? '#ef4444' : '#a855f7', // Red or Purple
    type: 'bug',
    hp: 1,
    label: BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)]
  })
}

const shoot = (target: Entity) => {
  const angle = Math.atan2(target.y - station.y, target.x - station.x)
  const speed = 8
  
  entities.push({
    x: station.x,
    y: station.y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 2,
    color: '#22d3ee', // Cyan Laser
    type: 'laser'
  })
}

const explode = (x: number, y: number, color: string) => {
  for (let i = 0; i < 8; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 3
    entities.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1 + Math.random() * 2,
      color: color,
      type: 'particle',
      hp: 1.0 // opacity
    })
  }
}

const update = (timestamp: number) => {
  if (!ctx || !canvasRef.value) return
  const canvas = canvasRef.value
  
  // Clear with trails (Fade out opacity)
  ctx.globalCompositeOperation = 'destination-out'
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)' 
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.globalCompositeOperation = 'source-over'

  // Move Station towards target (Mouse) with Lerp
  // Smooth factor 0.05
  const dx = targetX - station.x
  const dy = targetY - station.y
  station.x += dx * 0.05
  station.y += dy * 0.05

  // Spawning
  if (timestamp - lastSpawn > SPAWN_RATE) {
    spawnBug()
    lastSpawn = timestamp
  }
  
  // Auto-targeting
  if (Math.random() < 0.05) { 
    const bugs = entities.filter(e => e.type === 'bug')
    if (bugs.length > 0) {
        let nearest: Entity | null = null
        let minDist = Infinity
        for (const bug of bugs) {
            const dist = Math.hypot(bug.x - station.x, bug.y - station.y)
            if (dist < minDist) {
                minDist = dist
                nearest = bug
            }
        }
        if (nearest && minDist < 600) { 
            shoot(nearest)
        }
    }
  }

  // Update Entities
  entities.forEach(e => {
    e.x += e.vx
    e.y += e.vy

    if (e.type === 'particle' && e.hp !== undefined) {
        e.hp -= 0.03
        if (e.hp <= 0) e.dead = true
    }

    if (e.x < -100 || e.x > canvas.width + 100 || e.y < -100 || e.y > canvas.height + 100) {
        e.dead = true
    }

    // Collision
    if (e.type === 'laser') {
        const bug = entities.find(b => b.type === 'bug' && !b.dead && Math.hypot(b.x - e.x, b.y - e.y) < 30) // Increased hit radius for text
        if (bug) {
            bug.dead = true
            e.dead = true
            explode(bug.x, bug.y, bug.color)
        }
    }
  })

  entities = entities.filter(e => !e.dead)

  // Draw Station
  ctx.save()
  ctx.translate(station.x, station.y)
  ctx.beginPath()
  ctx.arc(0, 0, 40, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 + Math.sin(timestamp * 0.002) * 0.1})`
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.fillStyle = '#0891b2'
  ctx.beginPath()
  ctx.arc(0, 0, 6, 0, Math.PI * 2)
  ctx.fill()
  
  const toolsCount = 3
  for(let i=0; i<toolsCount; i++) {
     const angle = (timestamp * 0.001) + (i * (Math.PI * 2 / toolsCount))
     const tx = Math.cos(angle) * 25
     const ty = Math.sin(angle) * 25
     ctx.fillStyle = '#22d3ee'
     ctx.beginPath()
     ctx.arc(tx, ty, 2, 0, Math.PI * 2)
     ctx.fill()
  }
  
  // Station Label
  ctx.font = '10px monospace'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(34, 211, 238, 0.8)'
  ctx.fillText('JIMOH_SODIQ', 0, 55)
  ctx.restore()

  // Draw Entities
  entities.forEach(e => {
    ctx!.beginPath() // Non-null assertion for strict mode
    if (e.type === 'bug') {
        ctx!.font = '12px monospace'
        ctx!.textAlign = 'center'
        ctx!.textBaseline = 'middle'
        ctx!.fillStyle = e.color
        ctx!.fillText(e.label || 'BUG', e.x, e.y)
        
        // Glitch line
        if(Math.random() > 0.9) {
           ctx!.fillStyle = '#fff'
           ctx!.fillRect(e.x - 10, e.y + Math.random()*10 - 5, 20, 1)
        }
    } else if (e.type === 'laser') {
        ctx!.strokeStyle = e.color
        ctx!.lineWidth = 2
        ctx!.moveTo(e.x, e.y)
        ctx!.lineTo(e.x - e.vx * 2, e.y - e.vy * 2)
        ctx!.stroke()
    } else if (e.type === 'particle') {
        ctx!.globalAlpha = e.hp || 1
        ctx!.fillStyle = e.color
        ctx!.arc(e.x, e.y, e.size, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.globalAlpha = 1
    }
  })

  animationFrameId = requestAnimationFrame(update)
}

const handleResize = () => {
    if (canvasRef.value) {
        canvasRef.value.width = window.innerWidth
        canvasRef.value.height = window.innerHeight
        // Don't reset station on resize, just let it follow mouse
    }
}

onMounted(() => {
  // Initial mouse pos logic
  mouseX = window.innerWidth / 2
  mouseY = window.innerHeight / 2
  
  init()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  animationFrameId = requestAnimationFrame(update)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>
