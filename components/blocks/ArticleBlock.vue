<template>
  <article>
    <template v-if="$fetchState.pending">
      <content-placeholders rounded>
        <content-placeholders-heading />
        <content-placeholders-img />
        <content-placeholders-text :lines="50" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <header>
        <h1>{{ article.title }}</h1>
        <div class="tags">
          <nuxt-link
            v-for="tag in article.tags"
            :key="tag"
            :to="{ name: 't-tag', params: { tag } }"
            class="tag"
          >
            #{{ tag }}
          </nuxt-link>
        </div>
        <div v-if="article.cover_image" class="image-wrapper">
          <img :src="article.cover_image" :alt="article.title" />
        </div>
        <div class="meta">
          <div class="scl">
            <span>
              <heart-icon />
              {{ article.positive_reactions_count }}
            </span>
            <span class="comments" @click="scrollToComments">
              <comments-icon />
              {{ article.comments_count }}
            </span>
          </div>
          <time>{{ article.readable_publish_date }}</time>
        </div>
      </header>
      <!-- eslint-disable-next-line -->
      <div class="content" v-html="article.body_html" />
    </template>
  </article>
</template>

<script>
import HeartIcon from '@/assets/icons/heart.svg?inline'
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'
import CommentsIcon from '@/assets/icons/comments.svg?inline'

export default {
  components: {
    HeartIcon,
    InlineErrorBlock,
    CommentsIcon
  },
  props: [],
  async fetch() {
    const article = await fetch(
      `https://dev.to/api/articles/${this.$route.params.article}`
    ).then((res) => res.json())

    if (article.id && article.user.username === this.$route.params.username) {
      this.article = article
      this.$store.commit('SET_CURRENT_ARTICLE', this.article)
    } else {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('Article not found')
    }
  },
  data() {
    return {
      article: {}
    }
  },
  activated() {
    // Call fetch again if last fetch more than 60 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  },
  methods: {
    scrollToComments() {
      const el = document.querySelector('#comments')
      if (el) {
        const scrollTo = el.getBoundingClientRect().top
        window.scrollBy({ top: scrollTo - 20, left: 0, behavior: 'smooth' })
      }
    }
  },
  head() {
    return {
      title: this.article.title
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  padding: 0.5rem;
  border-radius: 1rem;
}

header {
  margin-bottom: 1rem;
  h1 {
    font-size: $text-4xl;
    letter-spacing: $-ls2;
    margin-bottom: 1rem;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
    .tag {
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
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $primary-dark;
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    @media (min-width: $screen-md) {
      margin-bottom: 1.5rem;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .meta {
    line-height: 1;
    font-size: $text-sm;
    text-transform: uppercase;
    font-weight: $bold-body-font-weight;
    letter-spacing: $-ls2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .scl {
      display: flex;
      span {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        svg {
          margin-right: 0.25rem;
        }
      }
      .comments {
        cursor: pointer;
      }
    }
  }
}

::v-deep .content {
  .ltag__user {
    display: none;
  }
  iframe {
    max-width: 100%;
  }
  h1 {
    font-size: $text-3xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h2 {
    font-size: $text-2xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h3 {
    font-size: $text-xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h4 {
    font-size: $text-base;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  a {
    color: $primary-color;
  }
  p {
    margin-bottom: 1rem;
    line-height: 1.4;
    code {
      background-color: #d2f3e1;
      border-radius: 0.25rem;
      padding: 0.25rem;
    }
  }
  img {
    width: 100%;
    border-radius: 0.5rem;
  }
  .highlight {
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }
  ul {
    list-style: numeral;
    margin-bottom: 1rem;
    li p {
      margin-bottom: 0;
    }
  }
  ol {
    margin-bottom: 1rem;
  }
}
</style>
