<script setup>
import OfferForm from '@/views/Home/OfferForm.vue';
import Btn from '@/components/common/Btn.vue';
</script>

<template>
  <main>
    <section>
      <div class="container">
        <div class="hero">
          <h1 class="hero__title">Trouvez un projet qui correspond à vos besoin</h1>
          <OfferForm />
        </div>
      </div>
    </section>
    <section class="advantages">
      <div class="container">
        <h2 class="advantages__title">Des centaines d'offres à votre disposition</h2>
        <div class="advantages__cards">
          <article class="advantages__cards__card" style="background-image: url('/card1home.jpg')">
            <p class="advantages__cards__card__title">Un choix de techno ultra large</p>
          </article>
          <article class="advantages__cards__card" style="background-image: url('/card2home.jpg')">
            <p class="advantages__cards__card__title">Des clients satisfaits, Des developpeurs satisfaits</p>
          </article>
          <article class="advantages__cards__card" style="background-image: url('/card3home.jpg')">
            <p class="advantages__cards__card__title">Une fiscalité inégalée</p>
          </article>
        </div>
      </div>
    </section>

    <section class="register-cta">
      <div class="container">
        <div class="register-cta__buttons">
          <Btn class="register-cta__buttons__button">Devenez freelance dès maintenant</Btn>
          <Btn class="register-cta__buttons__button">Postez votre première offre en tant que client</Btn>
        </div>
      </div>
    </section>

    <section class="countries">
      <div class="container">
        <div>
          <h2 class="countries__title">Nous sommes présent dans 5 pays</h2>
          <div class="countries__cards">
            <article class="country__cards__card">
              <div class="countries__cards__card__img" style="background-image: url('/country1home.jpg')"></div>
              <h3 class="countries__cards__card__title">Iles Fidji</h3>
            </article>
            <article class="country__cards__card">
              <div class="countries__cards__card__img" style="background-image: url('/country2home.jpg')"></div>
              <h3 class="countries__cards__card__title">Iles Caïman</h3>
            </article>
            <article class="country__cards__card">
              <div class="countries__cards__card__img" style="background-image: url('/country3home.jpg')"></div>
              <h3 class="countries__cards__card__title">Malte</h3>
            </article>
            <article class="country__cards__card">
              <div class="countries__cards__card__img" style="background-image: url('/country4home.jpg')"></div>
              <h3 class="countries__cards__card__title">Dubaï</h3>
            </article>
            <article class="country__cards__card">
              <div class="countries__cards__card__img" style="background-image: url('/country5home.jpg')"></div>
              <h3 class="countries__cards__card__title">France</h3>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  padding: 8rem 0 4rem 0;

  &__title {
    font-size: 3rem;
    margin: 0;
    max-width: 600px;
  }
}

.advantages {
  padding: 10rem 0 15rem 0;
  background-image: url('/backgroundhome.svg');
  background-size: cover;

  &__title {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 4rem;
  }

  &__cards {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;

    &__card {
      width: 360px;
      height: 400px;
      background: gray;
      background-size: cover;
      border-radius: var(--radius-1);

      &__title {
        margin: 0;
        padding: 1rem;
        width: 100%;
        height: 100%;
        color: var(--text-dark);
        font-size: 2rem;
        font-weight: 500;
        text-align: center;
        background: #FFFFFFaa;
        border-radius: var(--radius-1);

      }
    }
  }
}

.register-cta {
  padding: 7rem 0;

  &__buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    &__button {
      font-size: 2rem;
    }
  }
}

.countries {
  padding: 4rem 0;
  background: var(--background);

  &__title {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 4rem;
  }

  &__cards {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;

    &__card {
      &__img {
          width: 200px;
          height: 300px;
          background: gray;
          background-size: cover;
          background-position: center;
          border-radius: var(--radius-1);
      }
      &__title {
        text-align: center;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
