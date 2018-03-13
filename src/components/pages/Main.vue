<template>
  <main>
    <b-jumbotron :fluid="true" header="Объекты недвижимости">
      <p>Коммерческая недвижимость от собственников без комиссии.</p>
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
