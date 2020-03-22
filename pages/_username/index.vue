<template>
  <div class="page-wrapper">
    <username-block />
    <username-articles-block />
  </div>
</template>

<script>
import UsernameBlock from '@/components/blocks/UsernameBlock'
import UsernameArticlesBlock from '@/components/blocks/UsernameArticlesBlock'

export default {
  components: {
    UsernameBlock,
    UsernameArticlesBlock
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
}
</style>
