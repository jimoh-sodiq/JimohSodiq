<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number

interface Writer {
  x: number
  y: number
  text: string
  currentText: string
  index: number
  speed: number
  lastUpdate: number
  life: number
  color: string
}

const writers: Writer[] = []
const phrases = [
  "OPENING_NEW_DRAFT...",
  "GENERATING_IDEAS...",
  "COMPOSING_NARRATIVE...",
  "> LOGGING_THOUGHT_PROCESS",
  "SAVING_TO_ARCHIVE",
  "REVIEWING_SYNTAX...",
  "PUBLISHING_STREAM...",
  "CAPTURING_INSPIRATION",
  "WORD_COUNT: INCREASING",
  "FORMATTING_MARKDOWN...",
  "HEADLINE_OPTIMIZED",
  "STORY_ARC: DETECTED",
  "AUTO_SAVING..."
]

const colors = [
    '#a855f7', // Purple
    '#06b6d4', // Cyan
    '#64748b'  // Slate
]

let mouseX = 0
let mouseY = 0

const init = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')
}

const spawnWriter = () => {
    if (!canvasRef.value) return
    const canvas = canvasRef.value
    
    writers.push({
        x: Math.random() * (canvas.width - 200),
        y: Math.random() * canvas.height,
        text: phrases[Math.floor(Math.random() * phrases.length)],
        currentText: "",
        index: 0,
        speed: 30 + Math.random() * 50, // Typing speed
        lastUpdate: performance.now(),
        life: 1.0,
        color: colors[Math.floor(Math.random() * colors.length)]
    })
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  
  // Interactive effect: Disturb nearby writers
  writers.forEach(w => {
      const dist = Math.hypot(mouseX - w.x, mouseY - w.y)
      if (dist < 150) {
          w.life = Math.min(w.life + 0.05, 1) // Revive opacity
          w.color = '#fff' // Highlight white
      }
  })
}

const update = (timestamp: number) => {
    if (!ctx || !canvasRef.value) return
    const canvas = canvasRef.value
    
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    // Manage spawning
    if (writers.length < 15 && Math.random() > 0.98) {
        spawnWriter()
    }

    ctx.font = "12px 'JetBrains Mono', monospace"

    for (let i = writers.length - 1; i >= 0; i--) {
        const w = writers[i]
        
        // Typing logic
        if (timestamp - w.lastUpdate > w.speed && w.index < w.text.length) {
            w.currentText += w.text[w.index]
            w.index++
            w.lastUpdate = timestamp
        }

        // Draw
        ctx.fillStyle = w.color
        ctx.globalAlpha = w.life * 0.4 // Max opacity is low for subtle background
        ctx.fillText(w.currentText + (w.index < w.text.length ? '█' : ''), w.x, w.y) // Add cursor while typing
        
        // Life drain after typing finished
        if (w.index >= w.text.length) {
            w.life -= 0.005
        }

        // Remove dead
        if (w.life <= 0) {
            writers.splice(i, 1)
        }
    }
    ctx.globalAlpha = 1.0
    
    animationFrameId = requestAnimationFrame(update)
}

const handleResize = () => {
    init()
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
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>
