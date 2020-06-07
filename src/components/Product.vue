<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title text-muted text-uppercase text-center">{{ product.title }}</h5>
            <h6 class="card-price text-center"> N{{ product.amount }}<span class="period">/month</span></h6>
            <hr>
            <ul class="fa-ul">
                <li v-for="(description, index) in descriptions" :key="index">
                    <span class="fa-li"><i class="fas fa-check"></i></span><strong>{{ description }}</strong></li>
            </ul>

            
            <!-- <paystack
                :amount="amount"
                :email="email"
                :paystackkey="paystackkey"
                :reference="reference"
                :callback="callback"
                :close="close"
                :embed="false"
                :plan="plan3"
            >                
                Subscribe
            </paystack> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ["product"],
    computed: {
        descriptions(){
            const desc = this.product.description;
            console.log(desc);
            return JSON.parse(desc);
        }
    },  
};
</script>