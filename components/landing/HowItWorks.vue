<template>
  <div id="how-it-works" class="mt-8">
    <span class="d-block text-purple text-center">HOW IT WORKS</span>
    <h2 class="text-center mb-10">
      Your Customers Can Review You Anywhere Online
    </h2>
    <Person1 />
    <Connector1 />
    <Person2 />
    <Connector2 />
    <TwoPeople />
  </div>
</template>

<script>
import Person1 from '~/components/landing/HowItWorks/Person1'
import Person2 from '~/components/landing/HowItWorks/Person2'
import TwoPeople from '~/components/landing/HowItWorks/TwoPeople'
import Connector1 from '~/components/landing/HowItWorks/Connector1'
import Connector2 from '~/components/landing/HowItWorks/Connector2'
export default {
  components: {
    Person1,
    Person2,
    TwoPeople,
    Connector1,
    Connector2
  }
}
</script>

<style lang="scss">
@import '~/styles';

.how-it-works {
  position: relative;
}
.how-it-works--gray {
  color: #4A4A4A;
}
.how-it-works-image--single {
    width: 400px;
    @include large("down") {
        width: 100%;
    }
}
.how-it-works-image--double {
    width: 460px;
    @include large("down") {
        width: 100%;
    }
}
.how-it-works-text {}

.how-it-works-person--2 {
  @include xlarge("down") {
    flex-direction: column-reverse !important;
    align-items: center;
  }
}
</style>
