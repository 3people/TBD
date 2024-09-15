import HomePage from './pages/HomePage.svelte'
import MenuPage from './pages/MenuPage.svelte'
import TranslatePage from './pages/TranslatePage.svelte'
import DetailPage from './pages/DetailPage.svelte'
import SearchPage from './pages/SearchPage.svelte'

export const routes = {
  '/': HomePage,
  '/menu': MenuPage,
  '/translate': TranslatePage,
  '/detail': DetailPage,
  '/search': SearchPage,
}
