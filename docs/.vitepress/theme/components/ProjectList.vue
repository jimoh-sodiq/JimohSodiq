<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectsBackgroundAnimation from './ProjectsBackgroundAnimation.vue'

interface Project {
  year: string
  title: string
  description: string
  tags: string[]
  images: string[]
  link?: string
}

const projects: Project[] = [
  {
    title: "SimplifiedIQ",
    description: "AI-powered assessment platform for tamper-proof testing and certifications. Features automated grading, identity verification, and scalable delivery.",
    tags: ["Vue", "React", "Tauri", "Crxjs"],
    images: ["/projects/simplifiediq.png", "/projects/simplifiediq-2.png", "/projects/simplifiediq-3.png"],
    year: "2025"
  },
  {
    title: "Embervale",
    description: "A multi-platform and free Twitch RPG extension that gamifies the viewing experience. Allows viewers to quest together with streamers in an interactive overlay.",
    tags: ["Vue", "RPG", "Gaming"],
    images: ["/projects/embervale-1.png", "/projects/embervale-2.png", "/projects/embervale-3.png"],
    year: "2024"
  },
  {
    title: "Seamailer",
    description: "All-in-one email marketing platform to automate campaigns and scale revenue. Features drag-and-drop builder, audience segmentation, and automated funnels.",
    tags: ["Vue", "Node.js", "Automation"],
    images: ["/projects/seamailer-1.png", "/projects/seamailer-2.png", "/projects/seamailer-3.png"],
    year: "2024"
  },
  {
    title: "Noja360",
    description: "An all-in-one business management solution. Features tools for customer tracking, invoicing, and employee oversight in a single integrated dashboard.",
    tags: ["Nuxt", "Typescript", "PWA"],
    images: ["/projects/noja360-1.png", "/projects/noja360-2.png", "/projects/noja360-3.png"],
    year: "2022"
  },
  {
    title: "The Barakah Lifestyle NG",
    description: "Vibrant community fostering spiritual growth, personal development, and sisterhood among Muslim women. Provides a safe space for learning and growing in faith.",
    tags: ["Nuxt", "Typescript", "Ghost_cms"],
    images: ["/projects/tblt-1.png", "/projects/tblt-2.png", "/projects/tblt-3.png"],
    year: "2024"
  },
  {
    title: "Vue Patterns",
    description: "A comprehensive collection of essential patterns, tips, and best practices for Vue.js development. Provides practical examples and code snippets for common tasks.",
    tags: ["Vue.js", "Vitepress", "Typescript"],
    images: ["/projects/vuepatterns-1.png", "/projects/vuepatterns-2.png", "/projects/vuepatterns-3.png"],
    year: "2022"
  },
]
// job tracker, 

const activeProject = ref<Project | null>(null)
const activeImageIndex = ref(0)
const isModalOpen = ref(false)

const openGallery = (project: Project) => {
  activeProject.value = project
  activeImageIndex.value = 0
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeGallery = () => {
  isModalOpen.value = false
  setTimeout(() => {
    activeProject.value = null
  }, 300)
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (!activeProject.value) return
  activeImageIndex.value = (activeImageIndex.value + 1) % activeProject.value.images.length
}

const prevImage = () => {
  if (!activeProject.value) return
  activeImageIndex.value = (activeImageIndex.value - 1 + activeProject.value.images.length) % activeProject.value.images.length
}
import { onMounted } from 'vue'

onMounted(() => {
  console.log('ProjectList mounted, projects:', projects.length)
})
</script>

<template>
  <div class="projects-container min-h-screen relative">
    <ProjectsBackgroundAnimation />
    <div class="max-w-6xl mx-auto px-6 py-12 relative z-10">
    <div v-for="(project, index) in projects" :key="index" 
         class="project-item group relative mb-24 lg:mb-32"
         :style="{ '--delay': `${index * 0.2}s` }">
      
      <!-- Connecting Line (Decorative) -->
      <div v-if="index !== projects.length - 1" class="absolute left-4 md:left-1/2 bottom-[-96px] w-px h-24 bg-gradient-to-b from-cyan-500/20 to-transparent -translate-x-1/2 hidden md:block"></div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <!-- Text Section -->
        <div :class="{'md:order-2': index % 2 !== 0}" class="relative z-10 fade-enter-scroll">
          
          <div class="flex items-center gap-3 mb-4">
             <span class="text-xs font-mono font-bold text-cyan-500 tracking-widest uppercase px-2 py-1 bg-cyan-500/10 rounded border border-cyan-500/20">
                :: {{ project.year }}
             </span>
             <div class="h-px bg-cyan-900/50 flex-1"></div>
          </div>
          
          <h3 class="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-500 tracking-tight">
            {{ project.title }}
          </h3>
          
          <div class="glass-panel p-6 rounded-lg border-l-2 border-cyan-500/30 mb-8 bg-black/20 backdrop-blur-sm group-hover:border-cyan-400 transition-colors duration-300">
            <p class="text-lg text-justify text-gray-400 leading-relaxed font-light">
               {{ project.description }}
            </p>
          </div>
          
          <div class="flex flex-wrap gap-2 mb-8">
            <span v-for="tag in project.tags" :key="tag" 
                  class="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded bg-white/5 border border-white/10 text-gray-400 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors">
              _{{ tag }}
            </span>
          </div>

          <button @click="openGallery(project)" 
                  class="group/btn flex items-center gap-3 text-sm font-mono font-bold uppercase tracking-wider text-gray-300 hover:text-cyan-400 transition-colors pl-1">
            <span>[ View Gallery ]</span>
            <span class="i-carbon-caret-right group-hover/btn:translate-x-1 transition-transform text-cyan-500"></span>
          </button>
        </div>

        <!-- Preview Image (Cyber Tilt) -->
        <div :class="{'md:order-1': index % 2 !== 0}" class="relative fade-enter-scroll delay-100">
          <div class="relative rounded-xl overflow-hidden cursor-pointer transform group-hover:scale-[1.02] transition-all duration-500 border border-white/10 shadow-2xl group-hover:shadow-cyan-500/10 group-hover:border-cyan-500/50"
               @click="openGallery(project)">
            
            <!-- Cyber Overlay -->
            <div class="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay"></div>
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 z-20"></div>

            <img :src_disabled="project.images[0]" :src="project.images[0]" alt="Project Preview" class="w-full h-64 md:h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" />
            
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <div class="bg-black/60 backdrop-blur-md px-6 py-3 rounded border border-cyan-500/30 flex items-center gap-3">
                <span class="text-cyan-400 font-mono text-sm tracking-widest">ACCESS_TERMINAL</span>
              </div>
            </div>
            
            <!-- Corner Decors -->
            <div class="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity delay-100"></div>
            <div class="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity delay-100"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slideshow Modal -->
    <Transition name="fade">
      <div v-if="isModalOpen && activeProject" class="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-10 touch-none">
        
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl" @click="closeGallery">
          <!-- Grid Background -->
          <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        </div>

        <!-- Global Close Button (Fixed to viewport to ensure visibility) -->
        <button @click="closeGallery" class="fixed top-4 right-4 z-[10000] p-3 bg-cyan-950/80 border border-cyan-500/50 rounded-full text-cyan-400 hover:text-white hover:bg-cyan-900 backdrop-blur-md transition-all shadow-lg shadow-cyan-500/20 group">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-90 transition-transform duration-300"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div class="relative w-full max-w-6xl h-full md:h-auto md:aspect-video bg-black/80 rounded-none md:rounded-sm overflow-hidden shadow-2xl border-0 md:border border-white/10 flex flex-col md:flex-row ring-1 ring-cyan-500/20 z-[9999] touch-auto">
           
           <!-- Main Image area -->
           <div class="relative h-[45%] md:h-full md:flex-1 bg-black/50 flex items-center justify-center overflow-hidden group/modal">
              <Transition name="slide" mode="out-in">
                <img :key="activeImageIndex" :src="activeProject.images[activeImageIndex]" class="w-full h-full object-contain p-4" />
              </Transition>
              
              <!-- Controls -->
              <button v-if="activeProject.images.length > 1" @click.stop="prevImage" class="absolute left-2 md:left-4 p-3 bg-black/50 hover:bg-cyan-500/20 rounded-full border border-white/10 text-white transition-colors z-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button v-if="activeProject.images.length > 1" @click.stop="nextImage" class="absolute right-2 md:right-4 p-3 bg-black/50 hover:bg-cyan-500/20 rounded-full border border-white/10 text-white transition-colors z-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
           </div>

           <!-- Sidebar Info -->
           <div class="w-full md:w-80 h-[55%] md:h-full bg-[#0a0a0a] border-t md:border-t-0 md:border-l border-white/10 flex flex-col relative">
              <div class="p-6 md:p-8 border-b border-white/5">
                 <div class="flex justify-between items-start mb-2">
                     <span class="text-xs font-mono text-cyan-600">ID: {{ activeProject.year }}</span>
                     <button @click="closeGallery" class="text-gray-500 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                     </button>
                 </div>
                 <h3 class="text-xl md:text-2xl font-bold text-white tracking-tight">{{ activeProject.title }}</h3>
              </div>
              
              <div class="flex-1 overflow-y-auto p-6 md:p-8 overscroll-contain">
                <p class="text-gray-400 text-sm leading-relaxed font-light text-justify">
                  {{ activeProject.description }}
                </p>
                
                <div class="mt-8 flex flex-wrap gap-2">
                    <span v-for="tag in activeProject.tags" :key="tag" class="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-gray-500">
                        {{ tag }}
                    </span>
                </div>
              </div>
              
              <div class="p-6 md:p-8 border-t border-white/5 bg-black/20">
                 <div class="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
                    <img v-for="(img, idx) in activeProject.images" :key="idx" 
                         :src="img" 
                         @click="activeImageIndex = idx"
                         :class="{'ring-1 ring-cyan-500 opacity-100': activeImageIndex === idx, 'opacity-40': activeImageIndex !== idx}"
                         class="w-12 h-8 object-cover rounded-sm cursor-pointer hover:opacity-100 transition-all shrink-0" />
                 </div>
                 <div class="text-[10px] font-mono text-gray-600 text-right">
                    IMG_SEQ: {{ String(activeImageIndex + 1).padStart(2, '0') }} / {{ String(activeProject.images.length).padStart(2, '0') }}
                 </div>
              </div>
           </div>

        </div>
      </div>
    </Transition>
    </div>
  </div>
</template>

<style scoped>

/* Ensure z-index wars are won by the modal */
:deep(.vp-nav-bar) {
    z-index: 10 !important; /* Lower than modal */
}

.glass-panel {
  background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
}

.fade-enter-scroll {
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
}

@keyframes fadeUp {
   from { opacity: 0; transform: translateY(30px); }
   to { opacity: 1; transform: translateY(0); }
}

.delay-100 { animation-delay: 0.1s; }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: scale(0.98);
}
.slide-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
