<template lang="html">
  <div class="columns is-gapless">
    <div class="column blockchain-administrators">
      <div class="row">
        <h1 class="title is-1 has-text-dark">
          For Blockchain Administrators
        </h1>
      </div>
      <div class="row">
        <h2 class="subtitle is-3 has-text-dark">
          Tag friends or strangers with U.S. tax obligations
        </h2>
      </div>
      <div class="row">
        <a class="button is-dark stars" href="/blockchain_administrators.html">Proceed</a>
      </div>
    </div>

    <div class="column taxpayers">
      <div class="row">
        <h1 class="title is-1 has-text-dark">
          For Taxpayers
        </h1>
      </div>
      <div class="row">
        <h2 class="subtitle is-3 has-text-dark">
          Exercise Dominion &amp; Control
        </h2>
      </div>
      <div class="row">
        <a class="button is-dark stars" href="/taxpayers.html">Proceed</a>
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
  flex-flow: column;
  justify-content: space-around;
}

.row {
  padding: 0px 30px;
  display: flex;
  flex-flow: column;
  flex-basis: 0;
}

.row:nth-child(1) {
  justify-content: flex-end;
  flex-grow: 4;
  margin-top: 15px;
}

.row:nth-child(2) {
  justify-content: flex-start;
  flex-grow: 1;
}

.row:nth-child(3) {
  justify-content: flex-start;
  flex-grow: 4;
  margin-bottom: 15px;
}
</style>
