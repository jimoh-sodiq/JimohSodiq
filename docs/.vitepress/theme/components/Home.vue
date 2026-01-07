<script setup lang="ts">
import { ref } from 'vue'
import DefaultTheme from 'vitepress/theme'
import HomeBackgroundAnimation from './HomeBackgroundAnimation.vue'

const { Layout } = DefaultTheme

const navLinks = [
  { text: 'Projects', link: '/projects' },
  { text: 'Blog', link: '/blog/' },
  { text: 'About', link: '/about' }
]

const socialLinks = [
  { icon: 'i-carbon-logo-github', link: 'https://www.github.com/jimoh-sodiq' },
  { icon: 'i-carbon-logo-twitter', link: 'https://x.com/jimohsodiq_' },
  { icon: 'i-carbon-logo-linkedin', link: 'https://www.linkedin.com/in/jimoh-sodiq-1664951a6' }
]

// Contact Form Logic
const form = ref({
  name: '',
  email: '',
  message: ''
})
const result = ref('')
const status = ref('') // 'success' | 'error' | 'loading'

const submitForm = async () => {
  status.value = 'loading'
  result.value = 'INITIATING_TRANSMISSION...'

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3_FORM_KEY,
        ...form.value
      })
    })
    
    const data = await response.json()
    
    if (response.status === 200) {
      result.value = 'TRANSMISSION_SUCCESSFUL'
      status.value = 'success'
      form.value = { name: '', email: '', message: '' } // Reset
    } else {
      console.log(response)
      result.value = 'TRANSMISSION_FAILED: ' + data.message
      status.value = 'error'
    }
  } catch (error) {
    console.log(error)
    result.value = 'SYSTEM_ERROR: CONNECTION_LOST'
    status.value = 'error'
  }
}
</script>

<template>
  <div class="home-wrapper dark:text-gray-200 text-gray-700 min-h-screen relative">
    <HomeBackgroundAnimation />
    <div class="max-w-4xl mx-auto pt-4 md:pt-20 relative z-10">
      
      <!-- Hero Section -->
      <div class="relative mb-16 md:mb-24 fade-enter">
         <div class="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-3xl hidden md:block"></div>
         
         <div class="flex items-center gap-2 mb-4">
            <span class="px-2 py-1 text-[10px] font-mono text-cyan-400 bg-cyan-900/10 border border-cyan-500/20 rounded">STATUS: ONLINE</span>
            <div class="h-px w-12 bg-cyan-700/30"></div>
         </div>

         <h1 class="text-5xl sm:text-7xl font-bold mb-6 tracking-tight leading-none">
           <span class="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">Jimoh Sodiq</span>
           <span class="block text-2xl sm:text-3xl font-mono text-cyan-500/80 mt-2 font-normal">:: Fullstack_Engineer</span>
         </h1>
         
         <p class="text-lg sm:text-xl text-gray-400 mb-8 font-light max-w-2xl leading-relaxed border-l-2 border-purple-500/30 pl-6">
           Building digital experiences at the intersection of <span class="text-cyan-400 font-mono">Art</span> and <span class="text-purple-400 font-mono">Code</span>.
         </p>

         <div class="flex gap-4">
            <a href="/projects" class="group px-6 py-3 bg-white/5 border border-white/10 hover:border-cyan-500/50 text-white rounded transition-all hover:bg-cyan-500/10 flex items-center gap-2">
               <span class="font-mono text-sm">ACCESS_PROJECTS</span>
               <span class="i-carbon-arrow-right group-hover:translate-x-1 transition-transform text-cyan-500"></span>
            </a>
            <a href="/blog/" class="px-6 py-3 text-gray-400 hover:text-white transition-colors font-mono text-sm flex items-center gap-2 whitespace-nowrap">
               <span>[ VIEW_LOGS ]</span>
            </a>
            <a href="/uses" class="hidden md:flex px-6 py-3 text-cyan-500/60 hover:text-cyan-400 transition-colors font-mono text-sm items-center gap-2">
               <span>[ SYSTEM_LOADOUT ]</span>
            </a>
         </div>
      </div>

      <!-- Intro Section -->
      <div class="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-12 mb-16 md:mb-32 fade-enter delay-100">
         <div class="glass-panel p-4 md:p-8 rounded-xl border border-white/5 relative group">
            <!-- Decorative Corners -->
            <div class="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/30 group-hover:border-cyan-500 transition-colors"></div>
            <div class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/30 group-hover:border-cyan-500 transition-colors"></div>

            <p class="mb-6 text-justify text-gray-300 leading-relaxed">
              <span class="font-mono text-cyan-500 text-sm block mb-2">> WHO_AM_I</span>
              Hey! I'm Jimoh, a developer who turns coffee into code and confusion into features. 🧙‍♂️
              I specialize in building performant apps using <span class="text-cyan-400 font-mono">Vue</span>,
              <span class="text-purple-400 font-mono">Tauri</span>, and <span class="text-cyan-400 font-mono">React Native</span>, all powered by <span class="text-blue-400 font-mono">TypeScript</span>.
            </p>
            
            <p class="mb-6 text-justify text-gray-300 leading-relaxed">
              <span class="font-mono text-purple-500 text-sm block mb-2">> BACKEND_SKILLS</span>
              On the backend, I live in the terminal. Fluent in <span class="text-gray-100 font-medium">Node.js</span>, 
              <span class="text-gray-100 font-medium">Express</span>, and various databases (<span class="text-gray-100 font-medium">SQL</span> & <span class="text-gray-100 font-medium">NoSQL</span>).I am also a huge fan of <span class="text-blue-400 font-mono">Nuxt.js</span> for when I need this fast and SEO-friendly.
              Currently, I'm cheating on TypeScript with <span class="text-cyan-400 font-mono">Golang</span>. don't tell anyone 🤫
            </p>
            
            <p class="text-justify text-gray-300 leading-relaxed">
               <span class="font-mono text-green-500 text-sm block mb-2">> OFFLINE_MODE</span>
              When I'm AFK, you can catch me stressing over <span class="text-gray-100">FC Barcelona</span> ⚽, 
              trying to rank up in games 🎮, re-watching my favorite anime for the 10th time, or hunting for the spiciest food I can handle without crying 🍜.
            </p>

            <!-- <p class="text-justify text-gray-300 leading-relaxed">
               <span class="font-mono text-green-500 text-sm block mb-2">> STALK_ME</span>
              Stalking is encouraged (professionally)! Check out my messy code on <a href="https://github.com/jimoh-sodiq" target="_blank" rel="noopener noreferrer" class="text-blue-400 font-mono hover:underline">GitHub</a>.
            </p> -->
         </div>

         <!-- Statistics / Side Panel -->
         <div class="space-y-4">
            <div class="p-4 rounded border border-white/10 bg-black/20">
               <div class="text-[10px] font-mono text-gray-500 uppercase mb-1">Current_Focus</div>
               <div class="text-cyan-400 font-bold">Go & Microservices</div>
            </div>
            <div class="p-4 rounded border border-white/10 bg-black/20">
               <div class="text-[10px] font-mono text-gray-500 uppercase mb-1">Status</div>
               <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span class="text-gray-300 text-sm">Available</span>
               </div>
            </div>
            <div class="p-4 rounded border border-white/10 bg-black/20">
               <div class="text-[10px] font-mono text-gray-500 uppercase mb-1">Social_Uplink</div>
               <div class="flex gap-4 text-xl">
                  <a v-for="link in socialLinks" :key="link.icon" :href="link.link" target="_blank" class="text-gray-400 hover:text-cyan-400 transition-colors">
                     <span :class="link.icon"></span>
                  </a>
               </div>
            </div>
         </div>
      </div>

      <!-- Contact Form -->
      <div class="mb-20 fade-enter delay-200">
        <h2 class="text-2xl font-mono font-bold mb-8 flex items-center gap-4 text-white">
           <span class="text-purple-500">::</span> INITIATE_CONTACT
           <div class="h-px flex-1 bg-white/10"></div>
        </h2>
        
        <div class="bg-black/40 backdrop-blur-md rounded-xl p-6 md:p-10 border border-white/10 ring-1 ring-white/5 relative">
          <form @submit.prevent="submitForm" class="space-y-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="group">
                <label class="block text-xs font-mono text-cyan-500/70 mb-2 group-focus-within:text-cyan-400 transition-colors">USER_ID</label>
                <input v-model="form.name" type="text" required placeholder="John Doe" 
                       class="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-cyan-500 transition-all font-mono" />
              </div>
              <div class="group">
                <label class="block text-xs font-mono text-cyan-500/70 mb-2 group-focus-within:text-cyan-400 transition-colors">EMAIL_ADDRESS</label>
                <input v-model="form.email" type="email" required placeholder="john@example.com" 
                       class="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-cyan-500 transition-all font-mono" />
              </div>
            </div>
            <div class="group">
              <label class="block text-xs font-mono text-cyan-500/70 mb-2 group-focus-within:text-cyan-400 transition-colors">PAYLOAD_DATA</label>
              <textarea v-model="form.message" required rows="4" placeholder="Enter transmission..."
                        class="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-cyan-500 transition-all font-mono resize-none"></textarea>
            </div>
            
            <div class="flex items-center justify-between pt-4">
                <div class="hidden md:block h-px w-32 bg-white/10"></div>
                <button type="submit" :disabled="status === 'loading'"
                        class="px-8 py-3 bg-cyan-900/20 hover:bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 font-mono text-sm tracking-wider uppercase transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group">
                  <span v-if="status === 'loading'" class="animate-spin i-carbon-renew"></span>
                  {{ status === 'loading' ? 'TRANSMITTING...' : 'SEND_TRANSMISSION' }}
                  <span v-if="status !== 'loading'" class="i-carbon-send-filled group-hover:translate-x-1 transition-transform"></span>
                </button>
            </div>

            <p v-if="result" :class="{'text-green-400': status === 'success', 'text-red-400': status === 'error'}" class="text-center font-mono text-xs mt-6 tracking-widest border border-white/10 py-2 bg-black/50">
              >> SYSTEM_RESPONSE: {{ result }}
            </p>
          </form>
          
          <!-- Grid Background -->
          <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none rounded-xl"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
}

.fade-enter {
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }

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
</style>
