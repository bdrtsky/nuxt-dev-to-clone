<template>
  <nuxt-link
    :to="{
      name: 'username-article',
      params: { username: article.user.username, article: article.id }
    }"
    tag="article"
  >
    <div class="image-wrapper">
      <img
        v-if="article.cover_image"
        :src="article.cover_image"
        :alt="article.title"
      />
      <img v-else :src="article.social_image" :alt="article.title" />
    </div>
    <div class="content">
      <nuxt-link
        :to="{
          name: 'username-article',
          params: { username: article.user.username, article: article.id }
        }"
      >
        <h1>{{ article.title }}</h1>
      </nuxt-link>
      <div class="tags">
        <nuxt-link
          v-for="tag in article.tag_list"
          :key="tag"
          :to="{ name: 't-tag', params: { tag } }"
          class="tag"
        >
          #{{ tag }}
        </nuxt-link>
      </div>
      <div class="meta">
        <div class="social">
          <span>
            <heart-icon />
            {{ article.positive_reactions_count }}
          </span>
          <span>
            <comments-icon />
            {{ article.comments_count }}
          </span>
        </div>
        <time>{{ article.readable_publish_date }}</time>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import HeartIcon from '@/assets/icons/heart.svg?inline'
import CommentsIcon from '@/assets/icons/comments.svg?inline'

export default {
  components: {
    HeartIcon,
    CommentsIcon
  },
  props: {
    article: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      //
    }
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
article {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: $shadow;
  cursor: pointer;
  &:hover {
    box-shadow: $small-shadow;
  }
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $elevated-surface-color;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    padding: 1rem;
    h1 {
      font-size: $text-xl;
      margin-bottom: 1rem;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
      .tag {
        font-size: $text-sm;
        font-weight: $bold-body-font-weight;
        line-height: 1;
        padding: 0.5rem 0.5rem;
        margin: 0 0.5rem 0.5rem 0;
        border-radius: 0.25rem;
        box-shadow: $small-shadow;
        &:hover {
          background: $hovered-surface-color;
        }
        &:active {
          background: transparent;
          box-shadow: $small-inner-shadow;
        }
      }
    }
    .meta {
      font-size: $text-xs;
      letter-spacing: $-ls2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .social {
        display: flex;
        span {
          display: flex;
          align-items: center;
          margin-right: 1rem;
          svg {
            margin-right: 0.25rem;
          }
        }
      }
    }
  }
}
</style>
