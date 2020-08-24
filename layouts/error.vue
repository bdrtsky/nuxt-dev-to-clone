<template>
  <div v-if="error" class="page-wrapper">
    <h1>{{ error.statusCode }}</h1>
    <h2>{{ error.message }}</h2>

    <div class="error-navigation">
      <a href="#" @click="$router.push(-1)"> Back </a>
      <nuxt-link to="/"> Main Page </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  head() {
    return {
      title: this.error.message || 'Error Page'
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
  min-height: calc(100vh - 11rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: $text-4xl;
    letter-spacing: $-ls4;
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: $text-2xl;
    letter-spacing: $-ls4;
    margin-bottom: 1rem;
  }
  .error-navigation {
    letter-spacing: $-ls4;
    a:first-child {
      margin-right: 1rem;
    }
    a:hover {
      color: $primary-color;
    }
  }
}
</style>
