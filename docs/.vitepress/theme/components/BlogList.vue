<script setup lang="ts">
import { useData } from 'vitepress'
import BlogBackgroundAnimation from './BlogBackgroundAnimation.vue'

const posts = [
  {
    title: "Mastering Vue 3 Script Setup",
    date: "Jan 05",
    year: "2026",
    link: "/blog/sample-post",
    tags: ["Vue", "Composition API"],
    id: "LOG_001"
  },
  {
    title: "The Future of Web Styling",
    date: "Dec 12",
    year: "2025",
    link: "#",
    tags: ["CSS", "Design"],
    id: "LOG_002"
  },
  {
    title: "Building Scalable Go Services",
    date: "Nov 28",
    year: "2025",
    link: "#",
    tags: ["Go", "Backend"],
    id: "LOG_003"
  },
  {
    title: "Understanding Micro-interactions",
    date: "Oct 15",
    year: "2025",
    link: "#",
    tags: ["UX", "Animation"],
    id: "LOG_004"
  }
]

// Group by year
const groupedPosts = posts.reduce((acc, post) => {
  if (!acc[post.year]) acc[post.year] = []
  acc[post.year].push(post)
  return acc
}, {} as Record<string, typeof posts>)

const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a))
</script>

<template>
  <div class="blog-list-container relative">
    <BlogBackgroundAnimation />
    <!-- Background Grid Effect Removed -->

    <div v-for="(year, yearIndex) in years" :key="year" 
         class="mb-20 relative stagger-enter"
         :style="{ '--delay': `${yearIndex * 0.2}s` }">
      
      <!-- AI Futuristic Year Header -->
      <div class="relative mb-12 flex items-center">
         <div class="absolute -left-4 md:-left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-transparent opacity-50"></div>
         
         <div class="flex items-baseline gap-4">
             <span class="font-mono text-purple-400 text-sm tracking-widest bg-purple-900/20 px-2 py-1 rounded border border-purple-500/30">CYCLE_{{ year }}</span>
         </div>
         <div class="h-px bg-purple-900/50 flex-1 ml-4 shadow-[0_0_10px_rgba(168,85,247,0.3)]"></div>
      </div>

      <!-- Content Group -->
      <div class="relative z-10 md:pl-4 space-y-4">
        <div v-for="(post, index) in groupedPosts[year]" :key="post.title" 
             class="group block relative post-enter perspective-container"
             :style="{ '--delay': `${(yearIndex * 0.2) + (index * 0.1) + 0.3}s` }">
             
             <a :href="post.link" class="block relative transform-style-3d group-hover:translate-x-2 transition-transform duration-300">
                
                <!-- Card Background & Border -->
                <div class="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/5 rounded-lg group-hover:border-purple-500/50 transition-all duration-300 shadow-none group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"></div>
                
                <!-- Animated Glitch Overlay -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 mix-blend-overlay pointer-events-none rounded-lg"></div>

                <div class="relative p-6 flex flex-col md:flex-row gap-6 md:items-center">
                   
                   <!-- ID & Date Block -->
                   <div class="flex md:flex-col items-center md:items-start gap-3 md:gap-1 min-w-[100px] border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6 group-hover:border-purple-500/30 transition-colors">
                      <span class="text-[10px] font-mono text-cyan-600 group-hover:text-cyan-400 transition-colors">{{ post.id }}</span>
                      <span class="text-xs font-mono font-bold text-gray-400 group-hover:text-white transition-colors">
                        {{ post.date }}
                      </span>
                   </div>
                   
                   <!-- Main Info -->
                   <div class="flex-1">
                      <h3 class="text-xl md:text-2xl font-bold text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300 tracking-tight mb-2">
                        {{ post.title }}
                      </h3>
                      <div class="flex gap-2">
                         <span v-for="tag in post.tags" :key="tag" 
                               class="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm bg-white/5 text-gray-500 group-hover:text-purple-300 group-hover:bg-purple-500/10 transition-colors font-mono">
                           _{{ tag }}
                         </span>
                      </div>
                   </div>

                   <!-- Action Icon -->
                   <div class="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-900/20 transition-all">
                      <span class="i-carbon-arrow-right text-gray-500 group-hover:text-purple-400 text-xl group-hover:translate-x-1 transition-transform"></span>
                   </div>
                </div>
                
                <!-- Corner Accents -->
                <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-list-container {
  max-width: 900px;
  margin: 0 auto;
}

/* Entry Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-enter {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  animation-delay: var(--delay);
}

.post-enter {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  animation-delay: var(--delay);
}

.perspective-container {
    perspective: 1000px;
}

.transform-style-3d {
    transform-style: preserve-3d;
}
</style>
