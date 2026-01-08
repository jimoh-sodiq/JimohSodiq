---
title: Master One Build with Two
date: 2026-01-08
author: Jimoh Sodiq
layout: doc
tags:
  - Vue
  - React
  - Architecture
  - Performance
  - Migration
---

# Master One, Build with Two: Architectural Convergence in Modern Front-End

For senior engineers, the "React vs Vue" debate often devolved into syntax preference. However, with the maturation of React Hooks and Vue 3's Composition API, the conversation has shifted. We are no longer comparing templates vs JSX; we are comparing **Reactivity Models**: React's *Pull-based* immutable cycles versus Vue's *Push-based* fine-grained dependency tracking.

This guide deconstructs these frameworks not by syntax, but by primitive architectures, allowing you to leverage your deep knowledge of one to master the other.

## 1. The Fundamental Divergence: Reactivity Models

The most critical difference lies in how updates propagate.

### React: The "Pull" Model (Top-Down Execution)
React components are fundamentally functions that execute repeatedly. When state changes, React "pulls" a new render of the entire component subtree (unless memoized).

*   **Implication**: You must manually manage referential stability using `useMemo` and `useCallback` to prevent cascading re-renders.
*   **Mental Model**: "Snapshot at time T". Everything inside the function function scope (variables, closures) is captured for that specific render cycle.

### Vue: The "Push" Model (Fine-Grained tracking)
Vue components run their `setup()` function **exactly once**. Reactivity is achieved via a push-based system using proxies. When a reactive property changes, it notifies only the precise effects (DOM updates, computed properties) that depend on it.

*   **Implication**: You rarely need to manually memoize functions or values for performance. The "render" logic is just another effect subscribing to reactive state.
*   **Mental Model**: "Stable Graph". The component instance is static; data flows through a pre-connected graph of dependencies.

> **Architectural Note**: React optimizes for *simplicity of data flow* (always top-down), while Vue optimizes for *performance of updates* (precise invalidation).

---

## 2. State Primitives & Side Effects

### Mutable Proxies vs Immutable VDOM Snapshots

In React, state is immutable. You cannot modify it; you request a state transition. In Vue, state is mutable (wrapped in Proxies), and mutation triggers the reactivity system.

#### React: `useEffect` as a Synchronization Engine
`useEffect` is not just a lifecycle hook; it is a mechanism to synchronize your component with external systems (DOM, Network, Subscriptions) based on state snapshots.

```tsx
// React: Synchronization
// Re-runs whenever `id` changes referentially
useEffect(() => {
  const subscription = subscribe(id);
  return () => subscription.unsubscribe();
}, [id]);
```

#### Vue: `watch`/`watchEffect` as Dependency Subscriptions
Since Vue's `setup()` runs once, watchers are explicitly set up to track specific reactive signals.

```ts
// Vue: Reactivity Subscription
// Automatically tracks dependencies synchronously or asynchronously
watchEffect((onCleanup) => {
  const subscription = subscribe(id.value);
  onCleanup(() => subscription.unsubscribe());
});
```

> **Key Distinction**: React requires strict dependency arrays (`[]`) to avoid stale closures. Vue’s reactivity system prevents stale closures by design because `ref` values are stable references to mutable containers.

---

## 3. Abstraction & Reusability

Both frameworks have converged on Composables (Vue) and Hooks (React) as the primary unit of reuse. However, the constraints differ.

### The "Rules of Hooks" vs Setup Context
React Hooks rely on call order to maintain internal state slots. This imposes the "Rules of Hooks" (no conditionals, loops). Vue Composables are standard JavaScript functions that close over reactive state. They can be called anywhere, even in loops or conditionals (though conventionally kept at the top level).

**React Hook**
```tsx
// Strict call order required
const width = useWindowWidth();
if (width > 500) {
  // ❌ Violation: Hook called conditionally
  useAnotherHook(); 
}
```

**Vue Composable**
```ts
const width = useWindowWidth();
if (width.value > 500) {
  // ✅ Valid: Just a function call
  useAnotherComposable(); 
}
```

---

## 4. Performance & Memoization Strategies

### React: Manual Optimization
Performance optimization in React is often about *preventing* work.

*   **`useMemo`**: Required for expensive calculations to avoid re-computation on every render.
*   **`useCallback`**: Required to preserve function identity when passing callbacks to optimized children (`React.memo`).

### Vue: Automatic Optimization
Performance optimization in Vue is often about *doing nothing*.

*   **Computed**: Automatically cached based on dependencies. Safe by default.
*   **Functions**: Are explicitly stable. A function defined in `setup()` is created once. Passing it to a child prop never triggers a "diff" change because the reference never changes.

---

## 5. Ecosystem & Feature Equivalents

For engineers moving between frameworks, the "How do I do X?" question is paramount. Here is how common features map across the ecosystems.

### State Management
*   **React**: Context API (Simple), Redux/Toolkit (Complex), Zustand (Atomic).
*   **Vue**: `provide`/`inject` (Simple), Pinia (Standard).
    *   *Note*: Pinia is essentially a standardized wrapper around `reactive()` state with DevTools integration. It feels very similar to Zustand.

### Routing
*   **React**: React Router. Component-based (`<Route path="..." element={<Comp />} />`).
*   **Vue**: Vue Router. Config-based (`{ path: '...', component: Comp }`).
    *   Vue's router is deeply integrated with the framework's reactivity system, allowing route guards to be simple async functions.

### Form Handling
*   **React**: Controlled inputs (`value={state} onChange={update}`) or libraries like `react-hook-form`.
*   **Vue**: Two-way binding (`v-model`).
    *   `v-model` eliminates a massive amount of boilerplate code for forms. For validation, `VeeValidate` is the standard equivalent to `react-hook-form`.

---

## 6. The Ultimate Hook Mapping Guide

A direct reference for translating React Hooks to Vue 3 Composition API patterns.

| React Hook | Vue 3 Equivalent | Notes |
| :--- | :--- | :--- |
| `useState` | `ref` / `reactive` | Use `ref` for primitives, `reactive` for objects. |
| `useEffect` | `watch` / `onMounted` / `onUnmounted` | `watch` for side effects, lifecycle hooks for timing. |
| `useMemo` | `computed` | `computed` automatically tracks dependencies. |
| `useCallback` | Function declaration | Functions in `setup()` are stable by default. No hook needed. |
| `useRef` | `ref` | Used for both DOM elements and mutable non-reactive values. |
| `useContext` | `inject` | Used with `provide` in parent components. |
| `useReducer` | `reactive` + methods | specialized reducers are rarely needed due to mutable state simplicity. |
| `useLayoutEffect` | `onMounted` + `nextTick` | Wait for DOM update via `nextTick` inside `onMounted`. |
| `useImperativeHandle`| `defineExpose` | Explicitly exposes properties/methods from `<script setup>` components. |
| `useId` | No equivalent needed | Vue manages internal UIDs; usually standard UUID libs used if needed. |
| `useTransition` | `<Transition>` System | Vue has a dedicated component system for CSS/JS transitions. |
| `useDeferredValue` | `watchDebounced` / `watchThrottled` | Available via VueUse utility library. |
| `useSyncExternalStore`| Composables + `watch` | Standard pattern of subscribing in `onMounted` and cleaning up. |
| `useInsertionEffect` | No equivalent | CSS-in-JS injection handling is rarely a concern in Vue's style system. |

## Conclusion

Understanding these frameworks at a senior level means understanding the trade-offs of their reactivity engines. React gives you complete control over the render cycle at the cost of manual dependency management. Vue abstracts the render cycle behind a robust reactivity graph, offering ease of use at the cost of "magic" implementation details.

Mastering both allows you to choose the right tool for the architectural constraints of your project, rather than just the syntax you prefer.
