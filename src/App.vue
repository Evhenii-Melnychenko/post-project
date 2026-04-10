<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { usePostsStore } from '@/stores/posts';

  const postsStore = usePostsStore();
  postsStore.getPosts();
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/post-create" class="nav-link">New Post</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
  $color-primary: #3b82f6;
  $color-white: #fff;
  $bg-button-hover: #60a5fa;

  nav {
    padding: 1rem 2rem;
    background: $color-primary;
    border-bottom: 1px solid $bg-button-hover;

    .nav-link {
      color: $color-white;
      padding: 5px 15px;
      border-radius: 5px;
      transition: all 0.2s ease-in-out;
      margin-right: 1rem;

      &:hover {
        background: $bg-button-hover;
      }
    }
  }
</style>
