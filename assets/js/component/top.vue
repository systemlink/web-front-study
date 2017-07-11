<template>
  <div>
    <h1 v-text="message"></h1>
    <router-link to="places">Places</router-link>
    <router-link to="proposals">Proposals</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
module.exports = {
  data: function(){
    return {
      message: "Top"
    }
  }
}
</script>
