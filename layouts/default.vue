<template>
  <div>
    <the-header />
    <the-fork />
    <nuxt keep-alive />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import TheFork from '@/components/TheFork'

export default {
  components: {
    TheHeader,
    TheFooter,
    TheFork
  }
}
</script>

<style></style>
