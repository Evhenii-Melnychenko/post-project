<script setup lang="ts">
    import { ref } from 'vue';
    import { usePostsStore } from '@/stores/posts';

    import PostItem from '@/components/PostItem.vue';
    import MyWrapper from '@/components/MyWrapper.vue';

    const postsStore = usePostsStore();
    const postFilter = ref('all');

    const setPostFilter = () => {
        postFilter.value = postFilter.value === 'all' ? 'saved' : 'all';
    }
</script>

<template>
    <div class="header">
        <div>
          <h3>{{ postFilter === 'all' ? 'All Posts' : 'Saved Posts' }}</h3>
          <span v-show="postsStore.loading" class="material-icons">cached</span>
        </div>
        <button @click="setPostFilter">{{ postFilter === 'all' ? 'Show saved posts' : 'Show all posts' }}</button>
    </div>

    <div v-if="postsStore.errMsg" class="error">{{ postsStore.errMsg }}</div>

    <div v-if="postFilter === 'all'">
      <div v-for="post in postsStore.sorted" :key="post.id">
        <MyWrapper >
          <PostItem :post="post" />
        </MyWrapper>
      </div>
    </div>
 
    <div v-if="postFilter === 'saved'">
      <div v-for="post in postsStore.saved" :key="post.id">
            <MyWrapper >
                <PostItem :post="post" />
            </MyWrapper>
        </div>
     </div>
</template>

<style lang="scss" scoped>
  $color-primary: #3b82f6;
  $color-white:#fff;
  $color-err:#f87171;
  $bg-button-hover:#0ea5e9;

  .header {
    background: $color-white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

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

  .error {
    margin: 2rem;
    background: $color-err;
    color: $color-white;
    text-align: center;
    padding: 1rem;
    border-radius: 10px;
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
