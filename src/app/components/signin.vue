<template>
  <section class="section">
    <div class="container">
        <h1>Sign In</h1>
        <ul>
            <li v-for="provider in providers">
                 <a v-bind:href="`/signin?provider=${provider}`"><i v-bind:class="['fa', `fa-${provider}`]"></i><span class="is-capitalized">{{provider}}</span></a>
            </li>
        </ul>
    </div>
  </section>
</template>
<script>
module.exports = {
  props: ['providers']
}
</script>