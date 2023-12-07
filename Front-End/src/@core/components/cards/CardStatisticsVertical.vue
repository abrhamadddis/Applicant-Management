<template>
  <div class="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-101 transition duration-300 border-l-4 border-blue">
  <v-card>
    <v-card-text class="d-flex align-center pb-4">
      <img
        width="42"
        :src="image"
        alt="image"
      >
      <v-spacer />

      <!-- <MoreBtn
        size="x-small"
        class="me-n3 mt-n4"
      /> -->
    </v-card-text>

    <v-card-text>
      <p class="mb-1">
        {{ title }}
      </p>
      <h5 class="text-h5 text-no-wrap mb-3">
        {{ stats }}
      </h5>
      <!-- <span
        :class="isPositive ? 'text-success' : 'text-error'"
        class="d-flex align-center gap-1 text-sm"
      >
        <v-icon
          size="18"
          :icon="isPositive ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'"
        />
        {{ isPositive ? Math.abs(change) : change }}%
      </span> -->
    </v-card-text>
  </v-card>
</div>
  
</template>

<script>
import MoreBtn from '../../MoreBtn.vue';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    stats: {
      type: String,
      required: true
    },
    // change: {
    //   type: Number,
    //   required: true
    // }
  },
  computed: {
    isPositive() {
      return Math.sign(this.change) === 1;
    }
  },
  components: {
    MoreBtn,
  },
};
</script>