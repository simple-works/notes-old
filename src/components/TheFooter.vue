<template>
  <div id="the-footer">
    <footer class="footer has-text-centered">
      <section>
        <router-link :to="{ name: 'Home' }">
          Home
        </router-link>
        -
        <router-link :to="{ name: 'About' }">
          About
        </router-link>
        -
        <a href="http://m.me/ambratolm" target="_blank">
          Contact
        </a>
      </section>
      <section>
        <p>
          Making cool things for cool multimedias <br />
          &copy; <strong><a href="">Ambratolm</a></strong>
          {{ new Date().getFullYear() }}
        </p>
      </section>
      <br />
    </footer>
  </div>
</template>

<script>
export default {
  name: "TheFooter"
};
</script>
