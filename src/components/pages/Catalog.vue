<template>
  <main>
    <b-jumbotron :fluid="true" header="Каталог"/>
    <b-container>
      <b-row>
        <b-col v-for="index in 12" :key="`catalog-${index}`" cols="4" class="mb-4">
          <b-card title="Бизнес-центр Профсоюзная 125 стр. 1"
                  tag="article">
            <yandex-map
              style="height: 140px;"
              class="mb-3"
              :behaviors="[]"
              :controls="[]"
              :coords="[54.62896654088406, 39.731893822753904]">
              <ymap-marker
                marker-type="placemark"
                marker-id="1"
                :coords="[54.62896654088406, 39.731893822753904]"/>
            </yandex-map>
            <p class="card-text">
              Огороженная территория, охрана, видеонаблюдение, шлагбаум
            </p>
            <p>
              <b-btn variant="secondary" to="/object-card/1">Подробнее »</b-btn>
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
</style>
