export default {
  data() {
    return {
      isMobile: false,
      mobileBreakpoint: process.client ? window.matchMedia("(max-width: 768px)") : null
    }
  },
  methods: {
    checkForMobile() {
      this.isMobile = this.mobileBreakpoint.matches;
    }
  },
  mounted() {
    this.mobileBreakpoint.addListener(this.checkForMobile);
    this.checkForMobile();
  }
}
