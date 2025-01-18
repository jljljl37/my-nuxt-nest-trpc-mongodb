<template>
  <UContainer class="mt-20 max-w-md">
    <div class="space-y-4">
      <UFormGroup label="手机号" required>
        <UInput placeholder="手机号" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="邮件" required>
        <UInput placeholder="邮件" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="其他信息" hint="可选">
        <UInput placeholder="其他信息" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UButton class="w-full justify-center" type="submit" color="sky" variant="ghost" size="xl">
        <div class="">登录</div>
      </UButton>
    </div>
    <UDivider label="OR" orientation="vertical" class="mt-10 mb-10" />
    <div class="flex justify-center gap-10">
      <UButton color="sky" variant="ghost" size="xl">微信登录</UButton>
      <UButton color="sky" variant="ghost" size="xl">QQ登录</UButton>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const toast = useToast();

import { UButton, UCard, UContainer } from '#components';
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