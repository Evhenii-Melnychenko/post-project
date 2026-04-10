import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts-store', {
    // State holds the data of the store. In this case, we have an array of posts.
    state: () => ({
        posts: [] as { id: number; title: string; body: string; author: string; created_at: string; is_saved: boolean }[],
        loading: true,
        errMsg: '',
    }),
    // Getters are used to compute derived state based on the store's state. In this case, we have a getter to retrieve all saved posts.
    getters: {
        sorted(): { id: number; title: string; body: string; author: string; created_at: string; is_saved: boolean }[] {
           return [...this.posts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        },
        saved(): { id: number; title: string; body: string; author: string; created_at: string; is_saved: boolean }[] {
            return this.posts.filter(post => post.is_saved).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
    },
    // methods are used to define actions that can modify the state. In this case, we have a method to toggle the saved status of a post.
    actions: {
        getPosts() {
            fetch(`${import.meta.env.VITE_API_URL}/posts`)
                .then(response => response.json())
                .then(data => {
                    this.posts = data;
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                    this.errMsg = 'Error fetching posts';
                    this.loading = false;
                });
        },
        addPost(post: { title: string; body: string; author: string; created_at: string; is_saved: boolean }) {
            const nextId = this.posts.length > 0
                ? Math.max(...this.posts.map(p => p.id)) + 1
                : 1;
            const newPost = {
                id: nextId,
                title: post.title,
                body: post.body,
                author: post.author,
                created_at: new Date().toLocaleDateString(),
                is_saved: post.is_saved
            };

            fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            })
            .then(response => response.json())
            .then(data => {
                this.posts.push(data);
            })
            .catch(error => {
                console.error('Error adding post:', error);
                this.errMsg = 'Error adding post';
            });
        },
        deletePost(id: number) {
            this.posts = this.posts.filter(post => post.id !== id);

            fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
                method: 'DELETE',
            }).catch(error => {
                console.error('Error deleting post:', error);
                this.errMsg = 'Error deleting post';
            });
        },
        savePost(id: number) {
            const post = this.posts.find(post => post.id === id);
            
            if (post) {
                post.is_saved = !post.is_saved;
            }

            fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ is_saved: post?.is_saved }),
            }).catch(error => {
                console.error('Error updating post:', error);
                this.errMsg = 'Error updating post';
            });
        }
    }
})