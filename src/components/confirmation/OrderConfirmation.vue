<template>
<div id="order-confirmation-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <p>And that’s it! Amadeus will take care of trading your tokens using the 0x Protocol.
                    You can check your wallet balance at Metamask to see your transaction.</p>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-lg-1 col-md-0">
            </div>
            <div class="col-ld-11 col-md-12">
                <div class="row">
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-2 align-center">
                        <img src="../../assets/fill-1.svg"/>
                    </div>
                    <div class="col-md-1">
                        <div class="row">
                            <div class="col-md-12 align-center">
                                <img class="arrow-right" src="../../assets/arrow-right.svg"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 align-center">
                                <img class="arrow-left" src="../../assets/arrow-right.svg"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-3 align-center">
                        <img src="../../assets/logo.svg"/>
                    </div>
                    <div class="col-md-1">
                        <div class="row">
                            <div class="col-md-12 align-center">
                                <img class="arrow-left" src="../../assets/arrow-right.svg"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 align-center">
                                <img class="arrow-left" src="../../assets/arrow-right.svg"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 align-center">
                        <img src="../../assets/page-1.svg"/>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <br />
        <div class="row">
            <div class="col-lg-1 col-md-0"></div>
            <div class="col-lg-11 col-md-12">
                <div class="row">
                    <div class="col-lg-2 col-md-1"></div>
                    <div class="col-lg-3 col-md-4">
                        <button class="js-add btn btn-block btn-documentation" type="button" @click="goToDocumentation()">DOCUMENTATION</button>
                    </div>
                    <div class="col-lg-3 col-md-4">
                        <button class="js-add btn btn-block btn-start-demo" type="button" @click="goToWelcomePage()">RETRY DEMO</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'

@Component
export default class OrderConfirmation extends Vue {
  @Mutation addCodeLine
  @Mutation changePage
  @Mutation cleanCodeLine

  goToWelcomePage () {
    this.cleanCodeLine()
    this.changePage(0)
  }

  goToDocumentation () {
    window.open('https://amadeusrelay.github.io/AmadeusRelayFrontend/')
  }
}
</script>

<style scoped>
#order-confirmation-section .container {
    padding-top: 110px;
}

#order-confirmation-section .container p{
    font-size: 22px;
    color: #ffffff;
    font-weight: 300;
}

#order-confirmation-section .arrow-right {
  margin-top: 15px;
  width: 23px;
  height: 18px;
  object-fit: contain;
}

#order-confirmation-section .arrow-left {
  margin-top: 10px;
  width: 23px;
  height: 18px;
  object-fit: contain;
  transform: rotate(180deg);
}

.align-center{
    text-align: center;
}

@media (max-width: 992px){
    #order-confirmation-section .container p{
        font-size: 20px;
    }
}
</style>