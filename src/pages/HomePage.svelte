<script lang="ts">
  import FCard from '../components/FCard.svelte'
  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import {getHomeFoodMock} from '../requests/mock/home-mock'
  import {push} from 'svelte-spa-router'
  import FSearchInput from '../components/FSearchInput.svelte'
  import FRestaurant from '../components/FRestaurant.svelte'
  import {_, locale} from 'svelte-i18n'
  import {restaurantMock} from '../requests/mock/restaurant'
  import {getRandomRegionRestaurantMock} from '../requests/mock/region-restaurant'
  import Camera from '../assets/icons/Camera.svelte'
  import type {Language} from '../locale/types'

  emblaCarouselSvelte.globalOptions = {dragFree: true}

  const onClickCard = ({detail}: CustomEvent) => {
    if (detail) {
      push(`/food?id=${detail}`)
    }
  }

  const onEnter = ({detail: keyword}: CustomEvent) => {
    if (keyword) {
      push(`/search?keyword=${keyword}`)
    }
  }

  $: foodMock = getHomeFoodMock($locale as Language)
  $: randomRegionRestaurantMock = getRandomRegionRestaurantMock()
  $: regionTitle = randomRegionRestaurantMock.title[$locale as Language]

  const onRouteTranslate = () => {
    push('/translate')
  }

  const onClickRestaurant = (event: CustomEvent) => {
    push(`/restaurant?id=${event?.detail}`)
  }
</script>

<div class="w-full py-4 flex flex-col justify-center relative">
  <div class="px-5">
    <FSearchInput on:enter={onEnter} />
  </div>
  <div class="embla overflow-hidden mt-8 px-5" use:emblaCarouselSvelte>
    <div class="flex gap-3">
      {#each foodMock as item}
        <FCard title={item.title} id={item.id} image={item.image} on:click={onClickCard} />
      {/each}
    </div>
  </div>
  <div class="mt-12">
    <span class="font-bold text-lg px-5">{regionTitle}</span>
    <div class="overflow-hidden px-5" use:emblaCarouselSvelte>
      <div class="flex mt-4 gap-3">
        {#each randomRegionRestaurantMock.mock as item}
          <FRestaurant contentId={item.relation?.[$locale ?? '']} flow='vertical' on:click={onClickRestaurant} />
        {/each}
      </div>
    </div>
  </div>
  <div class="mt-12">
    <span class="font-bold text-lg px-5">{$_('home.popular')}</span>
    <div class="overflow-hidden px-5" use:emblaCarouselSvelte>
      <div class="flex mt-4 gap-3">
        {#each restaurantMock as item}
        <FRestaurant contentId={item.relation?.[$locale ?? '']} flow='vertical' on:click={onClickRestaurant} />
        {/each}
      </div>
    </div>
  </div>
  <button
    class="fixed bg-brand-point w-[4.5rem] h-[4.5rem] rounded-full bottom-0 right-0 mr-4 mb-4 flex justify-center items-center flex-col"
    on:click={onRouteTranslate}
  >
    <Camera />
    <div class="flex flex-col text-white text-[9px] text-center">
      <span>{$_('home.translate.first')}</span>
      <span>{$_('home.translate.second')}</span>
    </div>
  </button>
</div>
