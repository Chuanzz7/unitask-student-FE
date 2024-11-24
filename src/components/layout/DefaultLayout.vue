<script setup>
import TopNavBar from "@/components/layout/TopNavBar.vue";
import SideNavBar from "@/components/layout/SideNavBar.vue";
</script>

<template>
  <div class="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
  <div class="h-screen dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
    <SideNavBar/>
    <div class=" relative transition-all duration-200 ease-in-out xl:ml-68 rounded-xl ps ps--active-y">
      <div class="flex flex-col h-screen">
        <div>
          <TopNavBar/>
        </div>
        <div class="px-6 flex-grow">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>
