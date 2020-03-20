<template>
  <div>
    <button @click="$fetch">Update comments</button>
    <ul>
      <comment-block
        v-for="comment in comments"
        :key="comment.id_code"
        :comment="comment"
        :level="0"
      />
    </ul>
  </div>
</template>

<script>
import CommentBlock from '@/components/blocks/CommentBlock'

export default {
  components: {
    CommentBlock
  },
  props: [],
  async fetch() {
    const response = await fetch(
      // eslint-disable-next-line
      `https://dev.to/api/comments?a_id=${this.$route.params.article}`
    )
    const parsedResponse = await response.json()
    // console.log(parsedResponse)
    if (parsedResponse.length) {
      // eslint-disable-next-line
      this.comments = parsedResponse
    } else {
      // eslint-disable-next-line
      // this.$nuxt.error({ statusCode: 404, message: 'Article not found' })
    }
  },
  fetchOnServer: false,
  data() {
    return {
      comments: null
    }
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  padding: 0.5rem;
  box-shadow: $small-shadow;
  border-radius: 0.5rem;
  background-color: $primary-color;
  font-weight: $display-font-weight;
  text-transform: uppercase;
  letter-spacing: $-ls2;
  &:hover {
    box-shadow: $shadow;
  }
}
</style>
