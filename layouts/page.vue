<template lang="html">
  <section class="hero is-fullheight">
    <slot name="default" />

    <footer class="footer hero-foot" :style="{ 'background-image': 'url(starring.png)' }">
      <div class="level">
        <div class="level-left">
          <div class="container">
            <div class="hero">
              <h1 class="title is-2 has-text-warning">
                Ethereum Tax Dodgeball
              </h1>
              <h2 class="subtitle is-4 has-text-warning">
                by <a class="has-text-light" href="https://github.com/ItsNickBarry">Nick Barry</a>
              </h2>
            </div>
          </div>
        </div>

        <div class="level-right">
          <div class="container">
            <ul>
              <li><a class="has-text-light" href="/">Home</a></li>
              <li><a class="has-text-light" href="/about.html">About</a></li>
              <li><a class="has-text-light" href="https://github.com/ItsNickBarry/ethereum-tax-dodgeball">Repository</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
footer {
  background-repeat: repeat;
}
</style>

<style lang="scss">
@import "~bulma";

@import url('https://fonts.googleapis.com/css?family=Lusitana&display=swap');
* {
  font-family: 'Lusitana', serif;
}

html {
  overflow-y: auto;
}
</style>
