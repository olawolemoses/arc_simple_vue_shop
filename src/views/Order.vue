<template>
  <section class="pricing py-5">
  <div class="container">
    <div class="row" v-if="!loading">
        <div class="col-lg-4 m-auto">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-muted text-uppercase text-center">Transaction 
                        <span v-if="status == 'success'">Successful</span>
                        <span v-else>Failed</span>                    
                      </h5>
                      
                      <div v-if="status == 'success'">
                        <p class="text-center text-success"><i class="fa fa-check fa-3 display-4" aria-hidden="true"></i></p>
                        <p class="text-center"> Transaction with reference <strong>{{ reference }}</strong> was Successful</p>
                      </div>
                      <div v-else>  
                        <p class="text-center text-danger"><i class="fas fa-ban fa-3 display-4" aria-hidden="true"></i></p>
                        <p class="text-center"> Transaction with reference <strong>{{ reference }}</strong> was not successful</p>
                      </div>
                    <hr>
                    <router-link :to="`/dashboard`" class="btn btn-block btn-primary text-uppercase">Click Here to Continue</router-link>
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
  },
  components: {
  },
  mounted() {
    this.verifyTransactionProduct();
  },
  data() {
    return {
      product: {},
      reference: "",
      loading: true,
      status : ""
    };
  },
  methods: {

    verifyTransactionProduct() {
        if (!localStorage.getItem("auth")) {
          this.$router.push("/login");
          return;
        }

        this.reference = this.$route.query.trxref;

        console.log("reference", this.reference);

        Axios.post(`${config.apiUrl}/transaction/verify`, {
            reference: this.reference,
            productId: this.id
        },{
          headers: {
            Authorization: `Bearer ${this.$root.auth.token}`
          }
        })
        .then(( response ) => {
          this.loading = false;
          this.$noty.success("Subscription successful.");
          console.log("response", response )
          this.status = response.data.status;
          // this.$router.push("/dash");
        })
        .catch((error ) => {
          this.loading = false;
          this.$noty.error("Oops ! Something went wrong.");
          this.status = "failed";
          console.log("error", error.response, error )
        }) 
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