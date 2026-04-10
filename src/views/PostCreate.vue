<script setup lang="ts">
import MyWrapper from '@/components/MyWrapper.vue';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePostsStore } from '@/stores/posts';

const postsStore = usePostsStore();
const router = useRouter();

const post = reactive({
  title: '' as string,
  body: '' as string,
  author: '' as string,
});

const isFormValid = computed(() => {
  return post.title !== '' && post.body !== '' && post.author !== '';
});

const submitForm = () => {
  postsStore.addPost({
    title: post.title,
    body: post.body,
    author: post.author,
    created_at: new Date().toLocaleDateString(),
    is_saved: false,
  });

  router.push({ name: 'home' });
}
</script>

<template>
  <MyWrapper>
      <form @submit.prevent="submitForm">
        <h3>Create a New Post</h3>
        <div>
          <label for="title">Post title</label>
          <input type="text" id="title" name="title" v-model="post.title"/>
        </div>
        <div>
          <label for="content">Post body</label>
          <textarea id="content" name="content" v-model="post.body"></textarea>
        </div>
        <div>
          <label for="author">Author</label>
          <input type="text" id="author" name="author" v-model="post.author"/>
        </div>
        <div>
          <button :disabled="!isFormValid">Add</button>
        </div>
      </form>
  </MyWrapper>
</template>

<style lang="scss" scoped>
  $color-primary: #3b82f6;
  $color-white:#fff;
  $color-gray:#eee;

  form {
    padding: 2rem;
  }

  h3 {
    margin-bottom: 2rem;
  }

  div {
    margin-bottom: 1rem;

    input,
    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      border: 1px solid $color-gray;
      padding: 5px;
      border-radius: 5px;
      height: 48px;

      &:focus {
        outline: 2px solid $color-primary;
        border: none;
      }
    }

    button {
      background: $color-primary;
      color: $color-white;
      width: 100%;
      padding: 5px;
      border-radius: 5px;
      height: 48px;
      border: none;
      font-size: 1.5rem;

      &:hover {
        background: darken($color-primary, 10%);
      }

      &:disabled {
        background: $color-gray;
        cursor: not-allowed;
      }
    }
  }
</style>