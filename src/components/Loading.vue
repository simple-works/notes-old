<template>
  <div id="loading" class="animated infinite pulse">
    <div v-if="active" class="has-text-centered has-text-primary">
      <div style="margin-bottom: 10px" class="">
        <b-icon
          icon="spinner"
          size="is-large"
          type="is-primary"
          custom-class="fa-pulse"
        />
      </div>
      <div v-if="message">
        <span class="is-size-5 has-text-weight-bold">{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    active: Boolean,
    message: String
  }
};
</script>
