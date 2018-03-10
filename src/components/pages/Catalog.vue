<template>
  <b-container>
    <h1 class="display-3 mt-3 mb-4">Каталог</h1>
    <b-row>
      <template v-for="rowIndex in 3">
        <b-col v-for="colIndex in 3" :key="`catalog-${rowIndex}${colIndex}`" class="mb-4">
          <b-card title="Card Title"
                  img-src="https://lorempixel.com/600/300/food/5/"
                  img-alt="Image"
                  img-top
                  tag="article"
                  class="box-shadow">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-col>
        <div class="w-100"></div>
      </template>
    </b-row>
  </b-container>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
</style>
