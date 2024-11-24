<script setup>
import TopNavBar from "@/components/layout/TopNavBar.vue";
import SideNavBar from "@/components/layout/SideNavBar.vue";
</script>

<template>
  <div class="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
  <div class="h-full max-h-screen dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
    <SideNavBar/>
    <div class="relative transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <TopNavBar/>
        <div class="h-screen_content px-6">
          <router-view/>
        </div>
    </div>
  </div>
</template>
