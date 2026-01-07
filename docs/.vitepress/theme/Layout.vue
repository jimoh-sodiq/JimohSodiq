<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
import BlogPostHeader from './components/BlogPostHeader.vue'

const { Layout } = DefaultTheme
const { page } = useData()

const isPost = computed(() => {
  return page.value.relativePath.startsWith('blog/') && !page.value.relativePath.endsWith('index.md')
})
</script>

<template>
  <Layout :class="{ 'blog-post-layout': isPost }">
    <template #doc-before>
      <BlogPostHeader v-if="isPost" />
    </template>
  </Layout>
  <div class="fixed inset-0 -z-10 h-full w-full bg-[#0a0a0a] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] opacity-[0.3]"></div>
</template>

<style>
/* Logo styling override to make it bigger */
:root {
  --vp-nav-logo-height: 40px; 
}

/* Ensure logo image scales correctly */
.VPNavBarTitle .logo {
  height: 40px !important;
  width: auto !important;
}

/* Social icons styling */
.VPSocialLink {
  transition: all 0.3s ease;
}
.VPSocialLink:hover {
  transform: translateY(-2px);
  color: var(--vp-c-brand) !important;
}

/* Blog Post Specific Overrides */
.blog-post-layout .vp-doc h1 {
  display: none !important;
}

.blog-post-layout .vp-doc {
  /* Add some futuristic styling to the doc content */
}

/* Custom Blockquotes for posts */
.blog-post-layout .vp-doc blockquote {
  border-left: 4px solid #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.5rem;
  color: #d1d5db;
}

.blog-post-layout .vp-doc code {
    color: #22d3ee;
    background-color: rgba(34, 211, 238, 0.1);
}
.blog-post-layout .vp-doc pre code {
    color: inherit; /* Don't override syntax highlighting in blocks */
    background-color: transparent;
}
</style>
