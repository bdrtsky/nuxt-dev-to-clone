<template>
  <div class="username-articles-block">
    <template v-if="$fetchState.pending">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <p>Error while fetching posts: {{ $fetchState.error.message }}</p>
    </template>
    <template v-else>
      <div class="article-cards-wrapper">
        <article-card-block
          v-for="article in articles"
          :key="article.id"
          :article="article"
          class="article-card-block"
        />
      </div>
    </template>
  </div>
</template>

<script>
import ArticleCardBlock from '@/components/blocks/ArticleCardBlock'

export default {
  components: {
    ArticleCardBlock
  },
  async fetch() {
    const res = await fetch(
      // eslint-disable-next-line
      `https://dev.to/api/articles?username=${this.$route.params.username}`
    )
    // eslint-disable-next-line
    this.articles = await res.json()
  },
  data() {
    return {
      articles: null
    }
  }
}
</script>

<style lang="scss" scoped>
.username-articles-block {
  max-width: $screen-sm;
  margin: auto;
  padding: 1rem;
}
.article-cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .article-card-block {
    width: calc(100% - 2 * 1rem);
    margin: 1rem;
  }
}
</style>
