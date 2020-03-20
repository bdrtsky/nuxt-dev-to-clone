<template>
  <div class="page-wrapper">
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
      <p>Error while fetching posts: {{ error }}</p>
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
    const res = await fetch('https://dev.to/api/articles?tag=nuxt&top=365')
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
.page-wrapper {
  max-width: $screen-xl;
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
    @media (min-width: $screen-sm) {
      width: calc(50% - 2 * 1rem);
    }
    @media (min-width: $screen-md) {
      width: calc(33.33333% - 2 * 1rem);
    }
  }
}
</style>
