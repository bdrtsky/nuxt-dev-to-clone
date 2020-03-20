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
      <p>Error while fetching posts: {{ error }}</p>
    </template>
    <template v-else>
      <header>
        <h1>{{ article.title }}</h1>
        <div class="tags">
          <div v-for="tag in article.tags" :key="tag" class="tag">
            #{{ tag }}
          </div>
        </div>
        <div v-if="article.cover_image" class="image-wrapper">
          <img :src="article.cover_image" :alt="article.title" />
        </div>
        <time>{{ article.readable_publish_date }}</time>
      </header>
      <!-- eslint-disable-next-line -->
      <div class="content" v-html="article.body_html" />
    </template>
  </article>
</template>

<script>
export default {
  props: [],
  async fetch() {
    const response = await fetch(
      // eslint-disable-next-line
      `https://dev.to/api/articles/${this.$route.params.article}`
    )
    const parsedResponse = await response.json()
    if (
      parsedResponse.id &&
      // eslint-disable-next-line
      parsedResponse.user.username === this.$route.params.username
    ) {
      // eslint-disable-next-line
      this.article = parsedResponse
    } else {
      // eslint-disable-next-line
      this.$nuxt.error({ statusCode: 404, message: 'Article not found' })
    }
  },
  data() {
    return {
      article: {}
    }
  },
  activated() {
    // Call fetch again if last fetch more than 10 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 10000) {
      this.$fetch()
    }
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
article {
  padding: 2rem 2rem;
  // background-color: var(--elevated-surface-color);
  border-radius: 1rem;
  box-shadow: $shadow;
  @media (min-width: $screen-md) {
    padding: 2rem 3rem;
  }
}

header {
  margin-bottom: 1rem;
  h1 {
    font-size: $text-4xl;
    margin-bottom: 1rem;
  }
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $primary-dark;
    margin: 0 -2rem;
    margin-bottom: 1.5rem;
    @media (min-width: $screen-md) {
      margin: 0 -3rem;
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
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    .tag {
      padding: 0.25rem 0.5rem;
      margin: 0 0.5rem 0.5rem 0;
      border-radius: 0.25rem;
      box-shadow: $small-shadow;
      &:hover {
        box-shadow: $small-inner-shadow;
      }
    }
  }
  time {
    line-height: 1;
    font-size: $text-sm;
    text-transform: uppercase;
    font-weight: $bold-body-font-weight;
    letter-spacing: $-ls2;
  }
}

::v-deep .content {
  h1 {
    font-size: $text-3xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  h2 {
    font-size: $text-2xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: $text-xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  h4 {
    font-size: $text-base;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  a {
    color: $primary-color;
  }
  p {
    margin-bottom: 1rem;
    code {
      background-color: #d2f3e1;
      border-radius: 0.25rem;
      padding: 0.25rem;
    }
  }
  img {
    width: 100%;
    border-radius: 0.75rem;
    box-shadow: $small-shadow;
  }
  .highlight {
    margin-bottom: 1rem;
    border-radius: 0.75rem;
    box-shadow: $small-shadow;
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
