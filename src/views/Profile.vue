<template lang="pug">
  .profile
    div(v-if="userDoesNotExist") It looks like this user doesn't exist. 😅
    div(v-else-if="!user") Loading...
    //- else we have our user
    .profile__masthead(v-else)
      h1 {{ user.username }}
    div(v-if="posts")
      .profile__post(v-for="post in posts")
        router-link(:to="post.url") {{ post.title || 'Untitled' }} {{ post.publishedAt || '(draft)' }}
</template>

<script>
import { mapState } from 'vuex'
import usersApi from '@/api/users'

export default {
  name: 'Profile',
  data () {
    return {
      userDoesNotExist: false,
      user: null,
      posts: [],
      getPostsErr: null
    }
  },
  computed: mapState({
    currentUser (state) {
      return state.currentUser
    }
  }),
  created () {
    this.getProfile(this.$route.params.user_handle)
  },
  beforeRouteUpdate (to, from, next) {
    // Get our new user and then navigate
    this.getProfile(to.params.user_handle)
    next()
  },
  methods: {
    getProfile (userHandle) {
      usersApi.getProfile(userHandle)
        .then(this.getProfileOnSuccess)
        .catch(this.getProfileOnFail)
    },
    getProfileOnSuccess ({ data }) {
      this.userDoesNotExist = false
      const { Posts, ...rest } = data
      this.posts = Posts
      this.user = rest
    },
    getProfileOnFail (err) {
      if (err.response.status === 404) {
        this.posts = []
        this.user = null
        this.userDoesNotExist = true
      }
    }
  }
}
</script>

<style lang="scss">
@import '~styles/site.scss';

.profile {
  &__masthead {
    @include grid-column(6);
    @include grid-push(1);
  }
  &__post {
    @include grid-column(4);
    @include grid-push(2);
  }
}
</style>
