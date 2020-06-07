<template>
  <section class="pricing py-5">
  <div class="container">
    <div class="row" v-if="!loading">
        <div class="col-lg-8 m-auto">
            <div class="card">
                <div class="card-body">
                      <h5 class="card-title text-muted text-uppercase text-center">Transactions</h5>
                    <hr>

                    <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Product</th>
                            <th>Reference</th>
                            <th>Next Due</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr  v-for="(transaction, index) in transactions" :key="transaction.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ transaction.title }}</td>
                            <td>{{ transaction.reference }}</td>
                            <td>{{ transaction.created_at | moment("add", "30 days") | moment("MMMM Do, YYYY") }}</td>
                            <td>
                              <i class="fa fa-circle text-success" aria-hidden="true"></i>
                              {{ transaction.status == 1 ? 'Active' : 'In Active' }}   
                            </td>
                          </tr>
                        </tbody>
                      </table>                    
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
  props: [],
  computed:{
    authUser() {
      return this.$root.auth.user;
    },
  },
  components: {
  },
  mounted() {
    this.userTransactions();
  },
  data() {
    return {
      transactions: {},
      reference: "",
      loading: true,
      status : ""
    };
  },
  methods: {

    userTransactions() {
        if (!localStorage.getItem("auth")) {
          this.$router.push("/login");
          return;
        }

        Axios.get(`${config.apiUrl}/transaction/user/${this.authUser.id}`, {
            headers: {
              Authorization: `Bearer ${this.$root.auth.token}`
            }
        }).then(response => {
            this.loading = false;
            this.transactions = response.data.transactions;
            console.log(this.transactions);
        }).catch(({ response }) => {
          this.$noty.error("Oops ! Something went wrong.");
          console.log( response );
          this.loading = false;
          this.submitted = true;
          this.errors = response.data;
        });
    }

  }
};
</script>

<style scoped>

  .btn-warning {
    color: #fff;
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