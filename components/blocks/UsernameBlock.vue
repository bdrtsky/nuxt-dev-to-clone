<template>
  <section>
    <template v-if="$fetchState.pending">
      <div class="image-wrapper loading">
        <content-placeholders>
          <content-placeholders-img />
        </content-placeholders>
      </div>
      <div class="content">
        <content-placeholders rounded>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
      <div class="info">
        <content-placeholders rounded>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <div class="image-wrapper">
        <img :src="user.profile_image" :alt="user.name" />
      </div>
      <div class="content">
        <h1>{{ user.name }}</h1>
        <a
          :href="`https://dev.to/${user.username}`"
          target="_blank"
          rel="nofollow noopener noreferrer"
          class="f-button"
        >
          Follow
        </a>
        <div v-if="user.summary" class="summary">{{ user.summary }}</div>
        <div class="links">
          <a
            v-if="user.twitter_username"
            :href="`https://twitter.com/${user.twitter_username}`"
            target="_blank"
          >
            <twitter-icon />
          </a>
          <a
            v-if="user.github_username"
            :href="`https://github.com/${user.github_username}`"
            target="_blank"
          >
            <github-icon />
          </a>
          <a
            v-if="user.website_url"
            :href="user.website_url"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <external-link-icon />
          </a>
        </div>
      </div>

      <div class="info">
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
  </section>
</template>

<script>
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'
import TwitterIcon from '~/assets/icons/twitter.svg?inline'
import GithubIcon from '~/assets/icons/github.svg?inline'
import ExternalLinkIcon from '~/assets/icons/external-link.svg?inline'

export default {
  components: {
    TwitterIcon,
    GithubIcon,
    ExternalLinkIcon,
    InlineErrorBlock
  },
  props: [],
  async fetch() {
    const res = await fetch(
      `https://dev.to/api/users/by_username?url=${this.$route.params.username}`
    )

    if (!res.ok) {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('User not found')
    }
    this.user = await res.json()
  },
  data() {
    return {
      user: {}
    }
  },
  head() {
    return {
      title: this.user.name
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: $elevated-surface-color;
  border-radius: 1rem;
  padding: 2rem;
  margin: 0.5rem;
  .image-wrapper {
    width: 50%;
    padding-bottom: 50%;
    margin-bottom: 1rem;
    @media (min-width: $screen-sm) {
      width: 33.33333%;
      padding-bottom: 33.33333%;
    }
    @media (min-width: $screen-md) {
      width: 25%;
      padding-bottom: 25%;
    }
    @media (min-width: $screen-lg) {
      margin-bottom: 0;
    }
    background-color: $primary-dark;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &.loading {
      .vue-content-placeholders.vue-content-placeholders-is-animated {
        width: 100%;
        height: 100%;
        position: absolute;
        .vue-content-placeholders-img {
          height: 100%;
        }
      }
    }
  }
  > .content {
    width: 100%;
    margin-bottom: 1rem;
    @media (min-width: $screen-sm) {
      padding-left: 2rem;
      width: 66.66666%;
      margin-bottom: 0;
    }
    @media (min-width: $screen-md) {
      padding-left: 2rem;
      width: 75%;
      margin-bottom: 0;
    }
    @media (min-width: $screen-lg) {
      width: 50%;
      padding: 0 2rem;
    }
    h1 {
      font-size: $text-4xl;
      letter-spacing: $-ls2;
      margin-bottom: 1rem;
      line-height: 1;
    }
    .f-button {
      display: block;
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.5rem;
      box-shadow: $small-shadow;
      text-transform: uppercase;
      text-align: center;
      font-weight: $display-font-weight;
      letter-spacing: $-ls2;
      margin-bottom: 1rem;
      &:hover {
        background: $hovered-surface-color;
      }
      &:active {
        background: transparent;
        box-shadow: $small-inner-shadow;
      }
    }
    .summary {
      margin-bottom: 1rem;
      line-height: 1.4;
    }
    .links {
      display: flex;
      a {
        margin: 0 0.5rem;
        &:hover {
          color: $primary-color;
          svg {
            color: $primary-color;
          }
        }
      }
    }
  }
  .info {
    width: 100%;
    @media (min-width: $screen-lg) {
      width: 25%;
    }
    > div {
      margin-bottom: 0.5rem;
    }
    .title {
      font-size: $text-ss;
      letter-spacing: $-ls1;
      font-weight: $bold-body-font-weight;
      color: $gray-color;
      text-transform: uppercase;
      margin-bottom: 0.1rem;
    }
    .content {
      font-size: $text-sm;
      line-height: 1.25;
    }
  }
}
</style>
