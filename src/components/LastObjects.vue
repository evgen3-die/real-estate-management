<template>
  <b-container>
    <b-row>
      <b-col v-for="index in 3" :key="`last-object-${index}`">
        <h3>Бизнес-центр Профсоюзная 125 стр. {{ index }}</h3>
        <p>Огороженная территория, охрана, видеонаблюдение, шлагбаум</p>
        <p>
          <b-btn variant="secondary" href="$">Подробнее »</b-btn>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>
