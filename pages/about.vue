<template lang="html">
  <div class="columns is-gapless about">
    <div class="column">
      <div class="container">
        <div class="content">
          <h1 class="title is-1 has-text-dark">
            About
          </h1>

          <h2 class="subtitle is-3 has-text-dark">
            Open Source Licenses
          </h2>

          <p>
            EthereumTaxDodgeball is licensed under the <a href="/LICENSE.md">GNU AGPLv3</a>.
          </p>

          <p>
            The background patterns are released under the <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a> License:
          </p>

          <ul>
            <li>Green Dust &amp; Scratches by Atle Mo</li>
            <li>Starring by Agus Riyadi</li>
            <li>Blue Dust &amp; Scratches by Nick Barry, derived from Green Dust &amp; Scratches</li>
            <li>Red Dust &amp; Scratches by Nick Barry, derived from Green Dust &amp; Scratches</li>
          </ul>
          <p>
            The webfonts used are Lusitana by Ana Paula Megda and Inconsolata by Raph Levien, released under <a href="http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL_web">OFL 1.1</a>.
          </p>

          <p>
            Additional licenses can be found <a href="/LICENSE.txt">here</a>.
          </p>
        </div>
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

.column > * {
  padding: 30px;
}
</style>
