<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

const nodes: Node[] = []
const NODE_COUNT = 80
const CONNECTION_DIST = 150
let mouseX = 0
let mouseY = 0

const init = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')

  // Create initial nodes
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 1 + Math.random() * 2,
      color: Math.random() > 0.5 ? '#22d3ee' : '#8b5cf6' // Cyan or Purple
    })
  }
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const update = () => {
  if (!ctx || !canvasRef.value) return
  const canvas = canvasRef.value
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Update and Draw Nodes
  nodes.forEach(node => {
     node.x += node.vx
     node.y += node.vy

     // Bounce off edges
     if (node.x < 0 || node.x > canvas.width) node.vx *= -1
     if (node.y < 0 || node.y > canvas.height) node.vy *= -1

     ctx!.beginPath()
     ctx!.arc(node.x, node.y, node.size, 0, Math.PI * 2)
     ctx!.fillStyle = node.color
     ctx!.fill()
     
     // Connect to Mouse
     const mouseDist = Math.hypot(mouseX - node.x, mouseY - node.y)
     if (mouseDist < CONNECTION_DIST + 50) {
        ctx!.beginPath()
        ctx!.moveTo(node.x, node.y)
        ctx!.lineTo(mouseX, mouseY)
        ctx!.strokeStyle = `rgba(34, 211, 238, ${1 - mouseDist / (CONNECTION_DIST + 50)})`
        ctx!.lineWidth = 0.5
        ctx!.stroke()
        
        // Slight attraction to mouse
        if (mouseDist > 50) {
             node.x += (mouseX - node.x) * 0.0005
             node.y += (mouseY - node.y) * 0.0005
        }
     }

     // Connect to other nodes
     nodes.forEach(other => {
        if (node === other) return
        const dist = Math.hypot(node.x - other.x, node.y - other.y)
        if (dist < CONNECTION_DIST) {
           ctx!.beginPath()
           ctx!.moveTo(node.x, node.y)
           ctx!.lineTo(other.x, other.y)
           // Gradient line
           const grad = ctx!.createLinearGradient(node.x, node.y, other.x, other.y)
           grad.addColorStop(0, node.color)
           grad.addColorStop(1, other.color)
           ctx!.strokeStyle = grad
           ctx!.globalAlpha = 1 - dist / CONNECTION_DIST
           ctx!.lineWidth = 0.2
           ctx!.stroke()
           ctx!.globalAlpha = 1
        }
     })
  })

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
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>
