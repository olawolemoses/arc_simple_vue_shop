<template>
  <section class="pricing py-5">
  <div class="container">
    <div class="row" v-if="!loading">
      <div class="col-lg-4">
          <Product :product="product" />

      </div>
      <div class="col-lg-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-muted text-uppercase text-center">Checkout</h5>
                <h6 class="card-price text-center"> N{{ product.amount }}<span class="period">/month</span></h6>
                <hr>
                <a @click="pay()" class="btn btn-block btn-primary text-uppercase">Pay</a>
            </div>
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
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed:{
    authUser() {
      return this.$root.auth.user;
    },
    reference(){
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( let i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }    
  },
  components: {
    Product
  },
  mounted() {
    this.getProduct();
  },
  data() {
    return {
      product: {},
      loading: true
    };
  },
  methods: {
    getProduct(url = `${config.apiUrl}/products/${this.id}}`) {
      console.log("Console logging")
      this.loading = true;
      Axios.get(url).then(response => {
        this.loading = false;
        this.product = response.data.product;
        console.log(this.product)
      });
    },
    pay(){
      if (!localStorage.getItem("auth")) {
        this.$router.push("/login");
        return;
      }

      Axios.post(`${config.apiUrl}/transaction/initialize`, {
          amount: this.product.amount * 100,
          email: this.authUser.email,
          productId: this.product.id
      },{
        headers: {
          Authorization: `Bearer ${this.$root.auth.token}`
        }
      })
      .then(( response ) => {
        this.loading = false;
        this.$noty.success("Transaction Initialized successfully.");
        console.log("response", response )
        if(response.data.status){
          const { data } = response.data;
          // const access_code = data.access_code;
          console.log("data ===>", data)
          const authorizationUrl = data.authorization_url;
          // const reference = data.reference;

          window.location.href = authorizationUrl;
        }
        // this.$router.push("/");
      })
      .catch((error ) => {
        this.loading = false;
        this.$noty.error("Oops ! Something went wrong.");
        console.log("error", error.response, error )
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