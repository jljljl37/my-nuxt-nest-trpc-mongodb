<template>
  <div class="flex justify-center">
    <div>
      <UTable :rows="testList" :loading="getting" :columns="[
        { key: '_id', label: '' },
        { key: 'info', label: '信息' },
        { key: 'user', label: '用户' },
        { key: 'status', label: '状态' },
      ]">
        <template #_id-data="{ row }">
          <UButton @click="removeTest(row._id)" color="sky" variant="ghost" size="xl" label="删除"/>
        </template>
      </UTable>
    </div>
    <UDivider label="" orientation="vertical" class="ml-10 mr-10"/>
    <div class="space-y-4">
      <div class="card-header">管理面板</div>
      <UInput v-model="user" placeholder="user"></UInput>
      <UInput v-model="status" placeholder="status"></UInput>
      <UInput v-model="info" placeholder="info"></UInput>
      <UButton @click="createTest">创建</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();

import { UButton, UCard, UContainer, UInput } from '#components';
import { TestClient, tryCatchToast } from '@/utils/client';
import { Test } from '@/utils/class';
const testClient = new TestClient();

const id = ref('');
const getting = ref(false);
const testList = ref<Test[]>([]);

onMounted(() => {
  refresh();
})
async function refresh() {
  if (await tryCatchToast(toast, Promise.all([
    findAllTest(),
  ]), '刷新')) {}
}

const info = ref('');
const user = ref('');
const status = ref('');
async function createTest() {
  if (await tryCatchToast(toast, Promise.all([
    testClient.createTest({ info: info.value, user: user.value, status: status.value }),
  ]), '创建')) {
    refresh();
  }
}
async function findAllTest() {
  testList.value = await testClient.findAllTest() as Test[];
}
async function removeTest(id: string) {
  if (await tryCatchToast(toast, Promise.all([
    testClient.removeTestById(id),
  ]), '删除')) {
    refresh();
  }
}
</script>