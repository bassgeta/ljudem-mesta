<script lang="ts">
  import { locale } from 'svelte-i18n';

  let activeLocale = $locale;

  let isDropdownOpen = false

  const closeDropdown = () => {
    isDropdownOpen = false
  }

  const toggleDropdown = () => {
    isDropdownOpen = !isDropdownOpen
  }

  const availableLocales: Record<string, {value: string, label: string, flag: string}> = {
    sl: {
      value: 'sl',
      label: 'SI',
      flag: '🇸🇮' 
    },
    en: {
      value: 'en',
      label: 'EN',
      flag: '🇬🇧' 
    }
  }

  const getLocaleFlag = (locale: string) => {
    return availableLocales[locale]?.flag ?? availableLocales.en.flag;
  }

  const setLocale = (newLocale: string) => {
    locale.set(newLocale)
    activeLocale = newLocale
    localStorage.setItem('LOCALE', newLocale)
    closeDropdown()
  }
</script>

<div class="localeSwitcher">
  <button on:click={() => toggleDropdown()} class="actionButton">
    {#if isDropdownOpen}
      ❌
    {:else}
      <span class="content">{activeLocale ? getLocaleFlag(activeLocale) : availableLocales.en.flag}</span>
    {/if}
  </button>
  {#if isDropdownOpen}
    {#each Object.values(availableLocales) as availableLocale}
      <button on:click={() => setLocale(availableLocale.value)} class="actionButton">
        <span class="content">{availableLocale.flag}</span>
      </button>
    {/each}
  {/if}
</div>

<style>
  .localeSwitcher {
    position: fixed;
    top: 5px;
    right: 5px;
    width: 2.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .25rem;

    border-radius: 100000px; 
    background-color: var(--color-dark-grey);
    color: var(--color-red-dark);

    padding: .125rem;
  }

  .actionButton {
    background-color: var(--color-medium-grey);
    border-radius: 50%;
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-orange-red);
    font-size: 1.5rem;
  }

  .content {
    line-height: 1;
    vertical-align: middle;
  }
</style>
