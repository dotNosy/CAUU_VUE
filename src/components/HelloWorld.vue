<template>
<div id="carouselExampleControls" class="carousel slide" data-mdb-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img
        src="https://mdbootstrap.com/img/new/slides/041.jpg"
        class="d-block w-100"
        alt="..."
      />
    </div>
    <div class="carousel-item">
      <img
        src="https://mdbootstrap.com/img/new/slides/042.jpg"
        class="d-block w-100"
        alt="..."
      />
    </div>
    <div class="carousel-item">
      <img
        src="https://mdbootstrap.com/img/new/slides/043.jpg"
        class="d-block w-100"
        alt="..."
      />
    </div>
  </div>
  <a
    class="carousel-control-prev"
    href="#carouselExampleControls"
    role="button"
    data-mdb-slide="prev"
  >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </a>
  <a
    class="carousel-control-next"
    href="#carouselExampleControls"
    role="button"
    data-mdb-slide="next"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </a>
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
  background-color: red;
}
</style>
