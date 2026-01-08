<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter, page } = useData()

const date = computed(() => {
  const d = new Date(frontmatter.value.date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
})

const tags = computed(() => frontmatter.value.tags || [])

const logId = computed(() => {
  let hash = 0
  const str = page.value.relativePath
  if (str.length === 0) return '00000000'
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0 // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).toUpperCase().padStart(8, '0').slice(0, 8)
})
</script>

<template>
  <div class="blog-header mb-12 relative overflow-hidden rounded-xl border border-white/5 bg-black/20 p-8 md:p-12">
    <!-- Grid Background -->
    <div class="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(139,92,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.3)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
    
    <!-- Top Meta Line -->
    <div class="relative z-10 mb-8 flex justify-between items-start">
        <a href="/blog/" class="group flex items-center gap-3 px-4 py-2 bg-cyan-900/10 border border-cyan-500/30 rounded hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300">
            <div class="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-400 group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </div>
            <span class="text-xs font-mono font-bold text-cyan-300 group-hover:text-cyan-200 tracking-widest uppercase">
                Return_To_Base
            </span>
        </a>
    </div>

    <div class="relative z-10 flex flex-wrap items-center gap-4 mb-6 text-xs font-mono text-cyan-500/80 tracking-widest uppercase">
      <div class="flex items-center gap-2">
         <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
         <span>SECURE_CONNECTION</span>
      </div>
      <div class="h-px w-8 bg-cyan-700/50"></div>
      <div>ID: {{ logId }}</div>
    </div>

    <!-- Title -->
    <h1 class="relative z-10 text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 font-sans tracking-tight leading-tight">
      {{ frontmatter.title }}
    </h1>

    <!-- Footer Meta -->
    <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10 pt-6">
       <!-- Date -->
       <div class="flex items-center gap-3">
          <div class="p-2 rounded bg-white/5 border border-white/10 text-purple-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div class="flex flex-col">
             <span class="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Timestamp</span>
             <span class="text-sm text-gray-200 font-mono">{{ date }}</span>
          </div>
       </div>

       <!-- Tags -->
       <div class="flex flex-wrap gap-2">
          <span v-for="tag in tags" :key="tag" 
                class="px-3 py-1 rounded-sm bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono min-w-[30px] text-center hover:bg-purple-500/20 transition-colors">
            #{{ tag }}
          </span>
       </div>
    </div>
    
    <!-- Decorative Corner -->
    <div class="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
       <div class="absolute top-0 right-0 w-32 h-1 bg-cyan-500 rotate-45 transform origin-top-left translate-x-12"></div>
    </div>
  </div>
</template>

<style scoped>
/* Only way to get hashcode in pure JS without extra libs usually involves custom logic or assuming it's absent */
</style>
