<template lang="html">
  <div class="columns is-gapless">
    <div
      class="column"
      :style="{ 'background-image': 'url(red_dust_scratch.png)' }"
    >
      <div class="container has-text-dark">
        <h1 class="title is-1 has-text-dark">
          For Blockchain Administrators
        </h1>
        <h2 class="subtitle is-3 has-text-dark">
          Tag friends or strangers with U.S. tax obligations
        </h2>
        <a class="button is-dark" href="/fork">Go</a>
      </div>
    </div>

    <div
      class="column"
      :style="{ 'background-image': 'url(blue_dust_scratch.png)' }"
    >
      <div class="container has-text-dark">
        <h1 class="title is-1 has-text-dark">
          For Taxpayers
        </h1>
        <h2 class="subtitle is-3 has-text-dark">
          Manage Airdropped Tokens
        </h2>
        <a class="button is-dark" href="/redeem">Go</a>
      </div>
    </div>
  </div>
</template>

<script>
export const data = {
  layout: 'page',
};

export default {};
</script>

<style lang="css" scoped>
.columns {
  flex-grow: 1;
}

.columns.is-gapless {
  margin-bottom: 0px;
}

.column {
  display: flex;
  align-items: center;
}

.column > * {
  padding: 30px;
}
</style>
