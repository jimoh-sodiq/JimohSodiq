<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number

interface Tracer {
  x: number
  y: number
  dir: 0 | 1 | 2 | 3 // 0: up, 1: right, 2: down, 3: left
  life: number
  speed: number
  color: string
  path: {x: number, y: number}[]
}

const tracers: Tracer[] = []
let mouseX = 0
let mouseY = 0
let frameCount = 0

const init = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')
}

const spawnTracer = (x?: number, y?: number) => {
    if (!canvasRef.value) return
    const canvas = canvasRef.value
    
    tracers.push({
        x: x || Math.random() * canvas.width,
        y: y || Math.random() * canvas.height,
        dir: Math.floor(Math.random() * 4) as 0|1|2|3,
        life: 100 + Math.random() * 100,
        speed: 2 + Math.random() * 2,
        color: Math.random() > 0.5 ? '#22d3ee' : '#a855f7',
        path: []
    })
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  // Chance to spawn tracer at mouse
  if (Math.random() > 0.8) {
     spawnTracer(mouseX, mouseY)
  }
}

const update = () => {
  if (!ctx || !canvasRef.value) return
  const canvas = canvasRef.value
  frameCount++

  // Clear canvas fully (No trails)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Spawn random tracers
  if (frameCount % 20 === 0 && tracers.length < 50) {
      spawnTracer()
  }

  // Update Tracers
  for (let i = tracers.length - 1; i >= 0; i--) {
      const t = tracers[i]
      t.life--
      
      // Store current pos
      t.path.push({x: t.x, y: t.y})
      if (t.path.length > 20) t.path.shift()

      // Move
      switch(t.dir) {
          case 0: t.y -= t.speed; break;
          case 1: t.x += t.speed; break;
          case 2: t.y += t.speed; break;
          case 3: t.x -= t.speed; break;
      }

      // Random turn (90 degrees) to simulate circuit paths
      if (Math.random() < 0.05) {
          t.dir = (Math.random() > 0.5 ? (t.dir + 1) % 4 : (t.dir + 3) % 4) as 0|1|2|3
      }

      // Draw Head
      ctx.fillStyle = t.color
      ctx.fillRect(t.x - 1, t.y - 1, 3, 3)

      // Draw Path
      ctx.strokeStyle = t.color
      ctx.lineWidth = 1
      ctx.beginPath()
      if(t.path.length > 0) {
        ctx.moveTo(t.path[0].x, t.path[0].y)
        for(const p of t.path) {
            ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }

      // Mouse Interaction: Attraction / disruption
      const dist = Math.hypot(mouseX - t.x, mouseY - t.y)
      if (dist < 100) {
         ctx.strokeStyle = '#fff'
         ctx.lineWidth = 0.5
         ctx.beginPath()
         ctx.moveTo(t.x, t.y)
         ctx.lineTo(mouseX, mouseY)
         ctx.stroke()
         // Speed up near mouse
         t.life += 0.5
      }

      // Remove dead
      if (t.life <= 0 || t.x < 0 || t.x > canvas.width || t.y < 0 || t.y > canvas.height) {
          // Final spark
          ctx.fillStyle = '#fff'
          ctx.fillRect(t.x-2, t.y-2, 4, 4)
          tracers.splice(i, 1)
      }
  }

  animationFrameId = requestAnimationFrame(update)
}

const handleResize = () => {
    if (canvasRef.value) {
        canvasRef.value.width = window.innerWidth
        canvasRef.value.height = window.innerHeight
    }
}

onMounted(() => {
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
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>
