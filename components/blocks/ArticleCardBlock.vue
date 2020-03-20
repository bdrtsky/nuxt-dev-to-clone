<template>
  <article>
    <nuxt-link
      :to="{
        name: 'username-article',
        params: { username: article.user.username, article: article.id }
      }"
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
        <h1>{{ article.title }}</h1>
        <div class="tags">
          <div v-for="tag in article.tag_list" :key="tag" class="tag">
            #{{ tag }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
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
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $primary-dark;
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
      .tag {
        font-size: $text-sm;
        padding: 0.25rem 0.5rem;
        margin: 0 0.5rem 0.5rem 0;
        border-radius: 0.25rem;
        box-shadow: $small-shadow;
        &:hover {
          box-shadow: $small-inner-shadow;
        }
      }
    }
  }
}
</style>
