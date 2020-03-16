<template>
  <div id="app">
    <TheNavBar />
    <router-view />
    <TheFooter />
  </div>
</template>

<script>
import TheNavBar from "@/components/TheNavBar";
import TheFooter from "@/components/TheFooter";

export default {
  name: "App",
  components: {
    TheNavBar,
    TheFooter
  },
  metaInfo: {
    titleTemplate: titleChunk =>
      titleChunk ? `${titleChunk} - Notes` : "Notes",
    description: "Public notes sharing platform",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  created() {
    this.$store.dispatch("readNotes");
  }
};
</script>

<style lang="scss">
@import "main";
</style>
