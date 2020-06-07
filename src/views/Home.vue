<template>
  <section class="pricing py-5">
  <div class="container">
    <div class="row" v-if="!loading">
      <div class="col-lg-4" v-for="product in products" :key="product.id">
        <Product :product="product" />
          <div>
            <router-link :to="`/product/${product.id}`" class="btn btn-block btn-primary text-uppercase">Get Started</router-link>
          </div>        
      </div>
    </div>
    <div class="loader text-center" v-else>
      <i class="fas fa-3x fa-spin fa-spinner"></i>
    </div>
  </div>
  </section>
</template>


<script>
import Axios from "axios";
import config from "@/config";
import Product from "@/components/Product.vue";
export default {
  components: {
    Product
  },
  mounted() {
    this.getProducts();
  },
  data() {
    return {
      products: {},
      loading: true
    };
  },
  methods: {
    getProducts(url = `${config.apiUrl}/products`) {
      console.log("Console logging")
      this.loading = true;
      Axios.get(url).then(response => {
        this.loading = false;
        this.products = response.data.products;
        console.log(this.products)
      });
    }
  }
};
</script>

<style scoped>

  .btn-warning {
    color: #fff;
  }


section.pricing {
  
}

.pricing .card {
  border: none;
  border-radius: 1rem;
  transition: all 0.2s;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.pricing hr {
  margin: 1.5rem 0;
}

.pricing .card-title {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  letter-spacing: .1rem;
  font-weight: bold;
}

.pricing .card-price {
  font-size: 3rem;
  margin: 0;
}

.pricing .card-price .period {
  font-size: 0.8rem;
}

.pricing ul li {
  margin-bottom: 1rem;
}

.pricing .text-muted {
  opacity: 0.7;
}

.pricing .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  opacity: 0.7;
  transition: all 0.2s;
}

/* Hover Effects on Card */

@media (min-width: 992px) {
  .pricing .card:hover {
    margin-top: -.25rem;
    margin-bottom: .25rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  }
  .pricing .card:hover .btn {
    opacity: 1;
  }
}
</style>