---
aside: false
---
<div class="flex flex-col items-center mb-16 pt-8 fade-enter">
  <div class="flex items-center gap-3 mb-4">
    <div class="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-purple-500/50"></div>
    <span class="px-2 py-1 text-[10px] font-mono text-purple-400 bg-purple-900/10 border border-purple-500/20 rounded uppercase tracking-widest">Data_Stream</span>
    <div class="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-purple-500/50"></div>
  </div>
  <h1 class="text-5xl md:text-7xl font-bold text-center tracking-tighter mb-4">
    <span class="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10">BLOG_LOGS</span>
    <span class="text-purple-500">.</span>
  </h1>
  <div class="font-mono text-xs text-purple-500/60 tracking-[0.2em] uppercase">
    // INCOMING_TRANSMISSIONS
  </div>
</div>

<script setup>
import BlogList from '../.vitepress/theme/components/BlogList.vue'
</script>

<BlogList />

<style>
/* Animation */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-enter {
  animation: fadeInDown 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
</style>
