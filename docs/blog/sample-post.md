---
title: "Mastering Vue 3 Script Setup"
date: 2026-01-05
tags: ["Vue", "TypeScript"]
---

# Mastering Vue 3 Script Setup

The `<script setup>` syntax is the recommended way to use the Composition API in Vue 3. It provides a more concise and ergonomic way to define components.

## Why use it?

1. **Less boilerplate**: No need to return variables or components.
2. **Better TypeScript support**: Types are automatically inferred.
3. **Better performance**: The code is compiled into a more efficient render function.

## Code Example

Here is a simple counter component using TypeScript:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => {
  count.value++
}
</script>

<template>
  <div class="p-4 border border-primary-500/20 rounded-lg glass-morphism">
    <p class="text-lg">Count is: {{ count }}</p>
    <p class="text-sm text-gray-400">Double is: {{ doubleCount }}</p>
    <button 
      @click="increment"
      class="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-500 transition-colors rounded-md text-white font-medium"
    >
      Incerement
    </button>
  </div>
</template>
```

> [!TIP]
> Always use `ref` for primitive values and `reactive` for complex objects to keep your state management clean and predictable.

### Comparison with Options API

| Feature | Options API | Script Setup |
|---------|-------------|--------------|
| Boilerplate | High | Low |
| Logic Grouping | Divided by options | Grouped by feature |
| TS Integration | Decent | Excellent |

Enjoy building with Vue 3!
