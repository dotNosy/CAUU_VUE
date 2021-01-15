<template>
<div class="si">
  <b-carousel
      id="carousel-1"
      fade
      :interval="1000"
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      
    >
    <b-carousel-slide
      caption="First slide"
      img-src="https://wallpaperaccess.com/full/3513670.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://picsum.photos/1024/480/?image=12"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://picsum.photos/1024/480/?image=22"
    ></b-carousel-slide>
  </b-carousel>
</div>
</template>

<script>
  import DataService from "../Services/DataService";
export default {
  name: 'HelloWorld',
  data () {
    return {
      test : "",
      carouselImages: [
        {id: 1, image: "../assets/portada/1.jpg"},
        {id: 2, image: "../assets/portada/2.jpg"},
        {id: 3, image: "../assets/portada/3.jpg"},
        {id: 4, image: "../assets/portada/4.jpg"},
        {id: 5, image: "../assets/portada/5.jpg"},
        {id: 6, image: "../assets/portada/6.jpg"},
        {id: 7, image: "../assets/portada/7.jpg"},
        {id: 8, image: "../assets/portada/8.jpg"}
      ]
    }
  },
  methods: {
    getTest() {
      DataService.get()
        .then(response => {
          this.test = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
      this.getTest();
      // console.log("TEEEEEEEEST");
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.si{
  width: 100%;
  max-height: 1080px;
}
.coso{
  min-height: 100%;
}
</style>