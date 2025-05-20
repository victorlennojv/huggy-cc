<template>
  <div class="login-form">
    <h2 class="login-form__title">Login</h2>
    <BaseInput class="login-form__input" placeholder="E-mail ou usuário" />
    <BaseButton class="login-form__button">Continuar</BaseButton>
    <div class="login-form__divider-container">
      <hr class="login-form__divider" >
      <span class="login-form__divider-text">Ou</span>
      <hr class="login-form__divider" >
    </div>
    <div class="login-form__socials">
      <BaseButton class="login-form__social" variant="primary">
        <Icon name="uil:google" />
        Continuar com o Google
      </BaseButton>
      <BaseButton class="login-form__social" variant="primary">
        <Icon name="uil:facebook" />
        Continuar com o Facebook
      </BaseButton>
      <BaseButton class="login-form__social" variant="primary">
        <Icon name="uil:apple" />
        Continuar com a Apple
      </BaseButton>
    </div>
    <a class="login-form__register" href="https://register.huggy.io/?locale=pt-BR">Cadastrar</a>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
import BaseInput from '~/components/common/BaseInput.vue'
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  padding: 12px 0;

  &__title {
    @include title-3;
    color: var(--text-on-neutral-low-default);
    margin-bottom: 8px;
  }

  &__input {
    margin-bottom: 2px;
  }

  &__divider-container {
    color: var(--text-on-neutral-low-weak);
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 8px 0;
  }

  &__divider { 
    width: 100%;
  }

  &__button {
    border-radius: 26px;
    margin-bottom: 8px;
    background-color: var(--fill-primary-3) !important;
  }

  &__divider {
    text-align: center;
    border: 1px solid var(--border-neutral-2);
    color: var(--text-on-neutral-low-weak);
    margin: 8px 0;
  }

  &__socials {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__social {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    background-color: var(--fill-neutral-low-0) !important;
    color: var(--text-on-neutral-low-default) !important;
    border: 1px solid var(--border-neutral-2);
    border-radius: 26px;
    @include body-2-regular;
  }

  &__register {
    text-align: center;
    color: var(--text-on-neutral-low-default);
    text-decoration: none;
    font-size: var(--body-1-regular);
    margin-top: 8px;

    &:hover {
      color: var(--text-on-neutral-low-cta);
    }
  }
}
</style> 