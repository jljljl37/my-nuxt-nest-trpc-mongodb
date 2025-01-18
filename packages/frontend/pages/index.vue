<template>
  <!-- <div class="relative top-0 left-0 w-full h-full -z-50">
    <NuxtImg
      src="/bgimg/3.jpg"
      height="100vh"
    />
  </div> -->
  <div class="flex flex-col justify-center items-center">
    <div class=" mt-48 ml-[-40%] text-6xl">标题！！<br><br>标题！！！！！</div>
  </div>
</template>

<script setup lang="ts">
// useHead({
//   title: '测试界面',
// })
const toast = useToast();

import { UContainer } from '#components';
import { TestClient, tryCatchToast } from '~/utils/client';
const testClient = new TestClient();

const id = ref('');

onMounted(() => {
  refresh();
})
async function refresh() {
  if (await tryCatchToast(toast, Promise.all([
    findAllTest(),
  ]), '刷新')) {}
}

const info = ref('');
async function createTest() {
  if (await tryCatchToast(toast, Promise.all([
    testClient.createTest({ info: info.value })
  ]), '创建')) {
    refresh();
  }
}
async function findAllTest() {
  console.log(await testClient.findAllTest());
}
</script>