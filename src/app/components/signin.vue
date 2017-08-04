<template>
  <section class="section">
    <div class="container">
        <h1>Sign In</h1>
        <ul v-bind:providers="providers" >
            <li v-for="(provider, index) in providers" v-bind:key="index">
                 <a v-bind:href="`/connect/${provider}`"><i v-bind:class="['fa', `fa-${provider}`]"></i><span class="is-capitalized">{{provider}}</span></a>
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