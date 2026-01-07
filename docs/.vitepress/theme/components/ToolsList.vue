<script setup lang="ts">
import { toolsData } from '../data/tools'
import SpaceStationAnimation from './SpaceStationAnimation.vue'

const categories = toolsData
</script>

<template>
  <div class="tools-container max-w-5xl mx-auto pb-20 relative min-h-screen">
    <SpaceStationAnimation />
    
    <div class="relative z-10 px-4">
      <div v-for="category in categories" :key="category.id" class="mb-8 md:mb-16 last:mb-0 relative">
        <!-- Category Header -->
        <div class="flex items-center gap-4 mb-8">
          <div class="relative group">
             <div class="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div class="relative p-3 bg-white/5 backdrop-blur-md rounded-lg border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-colors">
                <span :class="[category.icon, 'text-2xl']"></span>
             </div>
          </div>
          <div>
             <h2 class="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight flex items-center gap-2">
               {{ category.title }}
             </h2>
             <div class="text-[10px] text-cyan-500/60 font-mono tracking-widest uppercase flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                ID: {{ category.id }}
             </div>
          </div>
          <div class="flex-1 h-px bg-gradient-to-r from-cyan-900/50 to-transparent ml-4"></div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div v-for="(item, idx) in category.items" :key="item.name" 
                class="group relative h-full bg-white/5 backdrop-blur-sm border border-white/5 rounded-none overflow-hidden hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.1)]">
              
              <!-- Tech Backdrop -->
              <div class="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(34,211,238,0.02)_0px,rgba(34,211,238,0.02)_1px,transparent_1px,transparent_10px)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="relative z-10 p-6 flex flex-col h-full">
                 <div class="flex justify-between items-start mb-4">
                    <div class="w-8 h-8 flex items-center justify-center rounded border border-white/10 text-gray-500 group-hover:text-cyan-400 group-hover:border-cyan-500/30 bg-black/20 transition-colors">
                       <span class="i-carbon-cube text-lg"></span>
                    </div>
                    <span class="text-[10px] font-mono text-gray-500 group-hover:text-cyan-500/50 transition-colors">MK-{{ idx + 1 }}</span>
                 </div>
                 
                 <h3 class="text-xl font-bold text-gray-200 group-hover:text-white mb-1 transition-colors group-hover:tracking-wide duration-300">{{ item.name }}</h3>
                 <p class="text-sm text-gray-400 font-mono mb-6 border-l-2 border-white/5 pl-3 group-hover:border-cyan-500/30 transition-colors">{{ item.desc }}</p>
                 
                 <div class="mt-auto pt-4 border-t border-white/5 group-hover:border-cyan-500/20 transition-colors">
                     <div class="flex justify-between text-[10px] uppercase font-mono text-gray-400 mb-1">
                        <span>{{ item.stat.split(':')[0] }}</span>
                        <span class="text-cyan-400">{{ item.stat.split(':')[1] }}</span>
                     </div>
                     <!-- Animated Bar -->
                     <div class="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                         <div class="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 w-0 group-hover:w-full transition-all duration-700 ease-out delay-100"></div>
                     </div>
                 </div>
              </div>

              <!-- Corner Brackets -->
              <div class="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                 <div class="w-2 h-2 border-t border-r border-cyan-400"></div>
              </div>
              <div class="absolute bottom-0 left-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                 <div class="w-2 h-2 border-b border-l border-cyan-400"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tools-container {
  /* Minimal override if needed */
}
</style>
