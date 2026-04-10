<script setup lang="ts">
  import { usePostsStore } from '@/stores/posts';

  const postsStore = usePostsStore();

  defineProps<{
    post: {
      id: number;
      title: string;
      body: string;
      author: string;
      created_at: string;
      is_saved: boolean;
    };
  }>();
</script>

<template>
  <div>
    <div class="header">
      <span>Written by {{ post.author }} on {{ post.created_at }}</span>
      <div>
        <button @click="postsStore.deletePost(post.id)" class="del material-icons">delete</button>
        <button @click="postsStore.savePost(post.id)" class="save material-icons">
          {{ post.is_saved ? 'bookmark' : 'bookmark_border' }}
        </button>
      </div>
    </div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
  </div>
</template>

<style lang="scss" scoped>
$color-primary: #0284c7;
$color-white: #fff;
$bg-button-hover: #0ea5e9;
$color-error: #f87171;

.header {
  background: $color-primary;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  div {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      animation: spin 1s linear infinite;
    }
  }

  button {
    color: $color-white;
    background: $color-primary;
    padding: 4px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    &:hover {
      background: $bg-button-hover;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
