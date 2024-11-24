<script setup>
</script>
<template>
  <div class="relative h-full flex-wrap overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
    <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
      <div class="flex items-center">
        <p class="mb-0 dark:text-white/80">Edit Profile</p>
        <button type="button"
                class="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">
          Settings
        </button>
      </div>
    </div>
    <div class="flex-auto p-6">
      <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">User Information</p>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
          <div class="mb-4">
            <label for="username" class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Username</label>
            <input type="text" name="username" value="lucky.jesse"
                   class="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"/>
          </div>
        </div>
        <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
          <div class="mb-4">
            <label for="email" class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Email
              address</label>
            <input type="email" name="email" value="jesse@example.com"
                   class="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"/>
          </div>
        </div>
        <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
          <div class="mb-4">
            <label for="first name" class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">First
              name</label>
            <input type="text" name="first name" value="Jesse"
                   class="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"/>
          </div>
        </div>
        <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
          <div class="mb-4">
            <label for="last name" class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Last
              name</label>
            <input type="text" name="last name" value="Lucky"
                   class="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"/>
          </div>
        </div>
      </div>
      <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>

      <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Contact Information</p>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
          <div class="mb-4">
            <label for="address" class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Address</label>
            <input type="text" name="address" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                   class="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"/>
          </div>
        </div>
        <div class="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
          <div class="mb-4">
            <label for="city"
                   class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">City</label>
            <input type="text" name="city" value="New York"
                   class="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"/>
          </div>
        </div>
        <div class="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
          <div class="mb-4">
            <label for="country" class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Country</label>
            <input type="text" name="country" value="United States"
                   class="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"/>
          </div>
        </div>
        <div class="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
          <div class="mb-4">
            <label for="postal code" class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Postal
              code</label>
            <input type="text" name="postal code" value="437300"
                   class="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"/>
          </div>
        </div>
      </div>
      <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>

      <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">About me</p>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
          <div class="mb-4">
            <label for="about me" class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">About
              me</label>
            <input type="text" name="about me"
                   value="A beautiful Dashboard for Bootstrap 5. It is Free and Open Source."
                   class="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>