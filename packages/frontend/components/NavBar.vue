<template>
  <div class="bg-sky-300 w-full h-2 mb-2"></div>
  <div class="header">
    <NuxtImg
      src="/logo.png"
      height="70px"
      fit="inside"
    />

    <div>
      <UButton to="/" color="sky" variant="ghost" size="xl">
        <div class="">首页</div>
      </UButton>
      <UButton to="/" color="sky" variant="ghost" size="xl">
        <div class="">介绍(概况、展示等)</div>
      </UButton>
    </div>

    <div>
      <!-- <ColorScheme>
        <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" color="sky" variant="none" />
      </ColorScheme> -->
      <UButton to="/login" color="sky" variant="ghost" size="xl">
        <div class="">登录</div>
      </UButton>
      <UButton to="/admin" color="sky" variant="ghost" size="xl">
        <div class="">（调试）</div>
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UButton } from '#components';

</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px;
  max-height: 90px;
  gap: 20px;
}
</style>