<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import pathnames from "@/router/pathnames";

import {useAuthStore} from "@/stores/AuthStore";

import buttonEnums from "@/enums/buttonEnums";

import AppButton from "@/components/AppButton.vue";

const form = reactive({
  isLoading: false,
  email: "",
  password: "",
  name: "",
});

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const routeBackToLogin = () => {
  router.push(pathnames.LoginView);
};

const submitSignUp = async () => {
  form.isLoading = true;

  const auth = {
    username: form.email,
    password: form.password,
    name: form.name,
    userRole: "STUDENT",
  };

  try {
    await authStore.signUp(auth);

    form.isLoading = false;
    toast.success("Successfully Registered!", {position: "top-center"});

    routeBackToLogin();
  } catch (error) {
    form.isLoading = false;

    //toast
    if (error.response.status === 401) {
      toast.error("Bad Credential", {position: "top-center"});
    } else {
      toast.error("Something Wrong", {position: "top-center"});
    }
  }
};
</script>

<template>
  <body class="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
  <main class="mt-0 transition-all duration-200 ease-in-out">
    <section>
      <div class="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
        <div class="container z-1">
          <div class="flex flex-wrap -mx-3">
            <div
                class="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
              <div
                  class="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 dark:bg-gray-950 rounded-2xl bg-clip-border">
                <div class="p-6 pb-0 mb-0">
                  <h4 class="font-bold">Sign Up</h4>
                  <p class="mb-0">Enter your email and password to sign up</p>
                </div>
                <div class="flex-auto p-6">
                  <form @submit.prevent="submitSignUp">
                    <div class="mb-4">
                      <input
                          type="email"
                          placeholder="Email"
                          v-model="form.email"
                          class="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                          type="text"
                          placeholder="Name"
                          v-model="form.name"
                          class="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                          type="password"
                          placeholder="Password"
                          v-model="form.password"
                          class="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                      />
                    </div>
                    <div v-if="form.isLoading" class="text-center text-blue-500 mt-5">
                      <PulseLoader color="#825ee4"></PulseLoader>
                    </div>
                    <div class="text-center flex justify-between gap-3">
                      <AppButton intent="outline" @click="routeBackToLogin">Back</AppButton>

                      <AppButton :type="buttonEnums.SUBMIT" :loading="form.isLoading">Sign up</AppButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
                class="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
              <div
                  class="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')] rounded-xl"
              >
                <span
                    class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-blue-500 to-violet-500 opacity-60"></span>
                <h4 class="z-20 mt-12 font-bold text-white">Student Portal</h4>
                <p class="z-20 text-white">The more effortless the writing looks, the more effort the writer actually
                  put into the process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  </body>
</template>
