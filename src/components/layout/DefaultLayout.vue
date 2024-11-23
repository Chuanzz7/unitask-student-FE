<script setup>
import TopNavBar from "@/components/layout/TopNavBar.vue";
import SideNavBar from "@/components/layout/SideNavBar.vue";
</script>

<template>
  <div class="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
  <div class="m-0 font-sans text-base font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500" >
    <SideNavBar/>
    <div class="relative min-h-screen max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl ps ps--active-y">
    <TopNavBar/>
    <div class="w-full px-6 py-6 mx-auto">
      <router-view/>
    </div>
  </div>
  </div>
</template>
