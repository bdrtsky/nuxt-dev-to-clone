<template>
  <aside>
    <template v-if="$fetchState.pending">
      <div class="username loading">
        <content-placeholders>
          <content-placeholders-heading :img="true" />
        </content-placeholders>
      </div>
      <div class="info">
        <content-placeholders>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <p>Error while fetching user: {{ error }}</p>
    </template>
    <template v-else>
      <div class="username">
        <nuxt-link
          :to="{
            name: 'username',
            params: { username: user.username }
          }"
        >
          <img :src="user.profile_image" :alt="user.name" />
        </nuxt-link>
        <div class="name">
          <nuxt-link
            :to="{
              name: 'username',
              params: { username: user.username }
            }"
          >
            <span>{{ user.name }}</span>
          </nuxt-link>
          <nuxt-link
            :to="{
              name: 'username',
              params: { username: user.username }
            }"
          >
            <span>@{{ user.username }}</span>
          </nuxt-link>
        </div>
      </div>
      <nuxt-link
        :to="{
          name: 'username',
          params: { username: user.username }
        }"
        class="follow-button"
      >
        Follow
      </nuxt-link>
      <div class="info">
        <div v-if="user.summary">
          <div class="title">about</div>
          <div class="content">{{ user.summary }}</div>
        </div>
        <div v-if="user.location">
          <div class="title">location</div>
          <div class="content">{{ user.location }}</div>
        </div>
        <div v-if="user.joined_at">
          <div class="title">joined</div>
          <div class="content">{{ user.joined_at }}</div>
        </div>
      </div>
    </template>
  </aside>
</template>

<script>
export default {
  props: [],
  async fetch() {
    const response = await fetch(
      // eslint-disable-next-line
      `https://dev.to/api/users/by_username?url=${this.$route.params.username}`
    )
    const parsedResponse = await response.json()
    // eslint-disable-next-line
    this.user = parsedResponse
  },
  fetchOnServer: false,
  data() {
    return {
      user: {}
    }
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
aside {
  padding: 1rem;
  box-shadow: $shadow;
  border-radius: 1rem;
  .username {
    display: flex;
    margin-bottom: 1rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 1rem;
    }
    .name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      a {
        line-height: 1;
      }
      a:first-child {
        font-size: $text-xl;
        font-weight: $bold-body-font-weight;
      }
    }
    &.loading {
      display: block;
    }
  }
  .follow-button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    background-color: $primary-color;
    border-radius: 0.5rem;
    box-shadow: $small-shadow;
    text-transform: uppercase;
    text-align: center;
    font-weight: $display-font-weight;
    letter-spacing: $-ls2;
    margin-bottom: 1rem;
  }
  .info {
    > div {
      margin-bottom: 0.5rem;
    }
    .title {
      font-size: $text-sm;
      letter-spacing: $-ls2;
      font-weight: $bold-body-font-weight;
      opacity: 0.5;
      text-transform: uppercase;
    }
    .content {
      font-size: $text-sm;
    }
  }
}
</style>
