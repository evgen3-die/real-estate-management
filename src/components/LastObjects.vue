<template>
  <b-container>
    <b-row>
      <b-col v-for="index in 3" :key="`last-object-${index}`">
        <h3>Бизнес-центр Профсоюзная 125 стр. {{ index }}</h3>
        <p>Огороженная территория, охрана, видеонаблюдение, шлагбаум</p>
        <p>
          <b-btn variant="secondary" to="/object-card/1">Подробнее »</b-btn>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>
