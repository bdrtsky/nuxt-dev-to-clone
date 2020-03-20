<template>
  <div v-if="error">
    <h1>{{ error.statusCode }}</h1>
    <h2>{{ error.message }}</h2>

    <div class="error-navigation">
      <a href="#" @click="$router.push(-1)">
        Back
      </a>
      <nuxt-link to="/">
        Main Page
      </nuxt-link>
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

<style lang="scss" scoped></style>
