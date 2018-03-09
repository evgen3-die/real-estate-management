<template>
  <main>
    <b-jumbotron :fluid="true">
      <template slot="header">
        Объекты недвижимости
      </template>
      <p>Коммерческая недвижимость в Москве от собственников без комиссии.</p>
      <b-btn variant="primary" size="lg" to="/catalog">Посмотреть каталог</b-btn>
    </b-jumbotron>
    <LastObjects/>
  </main>
</template>

<script>
import LastObjects from '../LastObjects';

export default {
  components: { LastObjects }
};
</script>
