<script setup>
import {reactive} from "vue";

import {useAuthStore} from "@/stores/AuthStore.js";

import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const auth = useAuthStore();

const state = reactive({
  isLogin: Boolean(auth.token),
});

const signOut = () => {
  auth.logout();
};

const onHandleSideBar = () => {
  const sidenav = document.querySelector("aside");
  const sidenav_trigger = document.querySelector("[sidenav-trigger]");
  const burger = sidenav_trigger.firstElementChild;
  const top_bread = burger.firstElementChild;
  const bottom_bread = burger.lastElementChild;

  if (sidenav.getAttribute("aria-expanded") == "false") {
    sidenav.setAttribute("aria-expanded", "true");
  } else {
    sidenav.setAttribute("aria-expanded", "false");
  }

  sidenav.classList.toggle("translate-x-0");
  sidenav.classList.toggle("ml-6");
  sidenav.classList.toggle("shadow-xl");

  top_bread.classList.toggle("translate-x-[5px]");
  bottom_bread.classList.toggle("translate-x-[5px]");
};

window.addEventListener("click", (e) => {
  const sidenav = document.querySelector("aside");
  const sidenav_trigger = document.querySelector("[sidenav-trigger]");

  if (!sidenav?.contains(e.target) && !sidenav_trigger?.contains(e.target)) {
    if (sidenav?.getAttribute("aria-expanded") === "true") {
      sidenav_trigger?.click();
    }
  }

});
</script>

<template>
  <nav
      class="relative flex flex-wrap items-center justify-between px-0 pt-4 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start"
      navbar-main navbar-scroll="false">
    <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
      <AppBreadcrumb/>

      <div class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
        <div class="flex items-center md:ml-auto md:pr-4"></div>
        <ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
          <li class="flex items-center">
            <button class="block px-0 py-2 text-sm font-semibold text-white transition-all ease-nav-brand"
                    @click="signOut">
              <i class="fa fa-user sm:mr-1"></i>
              <span class="hidden sm:inline">Sign Out</span>
            </button>
          </li>

          <li class="flex items-center pl-4 xl:hidden">
            <a href="javascript:;" class="block p-0 text-sm text-white transition-all ease-nav-brand"
               @click="onHandleSideBar" sidenav-trigger>
              <div class="w-4.5 overflow-hidden">
                <i class="ease mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all"></i>
                <i class="ease mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all"></i>
                <i class="ease relative block h-0.5 rounded-sm bg-white transition-all"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
