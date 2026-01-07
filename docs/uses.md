---
aside: false
pageClass: tools-page
---

<div class="flex flex-col items-center mb-8 md:mb-16 pt-4 md:pt-8 fade-enter">
  <div class="flex items-center gap-3 mb-4">
    <div class="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-green-500/50"></div>
    <span class="px-2 py-1 text-[10px] font-mono text-green-400 bg-green-900/10 border border-green-500/20 rounded uppercase tracking-widest">Loadout_Config</span>
    <div class="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-green-500/50"></div>
  </div>
  <h1 class="text-5xl md:text-7xl font-bold text-center tracking-tighter mb-4">
    <span class="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10">USES</span>
    <span class="text-green-500">.</span>
  </h1>
  <div class="font-mono text-xs text-green-500/60 tracking-[0.2em] uppercase">
    // SYSTEM_INVENTORY_INIT
  </div>
</div>

<script setup>
import ToolsList from './.vitepress/theme/components/ToolsList.vue'
</script>

<ToolsList />

<style>
/* Animation */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-enter {
  animation: fadeInDown 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.tools-page .vp-doc {
  max-width: 100% !important;
  padding: 0 !important;
}
.tools-page .content-container {
  max-width: 100% !important;
}
.tools-page .content {
    /* max-width: 100% !important; */
}
</style>
