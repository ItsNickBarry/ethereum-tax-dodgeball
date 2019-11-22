<template lang="html">
  <div
    class="columns is-gapless"
    :style="{ 'background-image': 'url(green_dust_scratch.png)' }"
  >
    <div class="column">
      <div class="container">
        <h1 class="title is-1 has-text-dark">
          About
        </h1>

        <h2 class="subtitle is-3 has-text-dark">
          Licenses
        </h2>

        <div class="content">
          <p>
            The background patterns are released under the <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a> License:
          </p>

          <ul>
            <li>Green Dust &amp; Scratches by Atle Mo</li>
            <li>Starring by Agus Riyadi</li>
            <li>Blue Dust &amp; Scratches by Nick Barry, derived from Green Dust &amp; Scratches</li>
            <li>Red Dust &amp; Scratches by Nick Barry, derived from Green Dust &amp; Scratches</li>
          </ul>
        </div>

        <div class="content">
          <p>
            The webfont used is Lusitana by Ana Paula Megda, released under <a href="http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL_web">OFL 1.1</a>.
          </p>
        </div>

        <div class="content">
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
