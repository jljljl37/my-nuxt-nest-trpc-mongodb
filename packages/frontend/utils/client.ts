import { trpc } from "~/utils/trpc";

import type { Test } from "../../backend/src/trpc/mongodb/test";

export async function tryCatchToast(toast: any, func: Promise<any>, opration: string = '操作'): Promise<boolean> {
    try {
        await func;
    } catch (error) {
        toast.add({ title: opration + '失败', color: 'red' });
        console.log(error);
        return false;
    }
    toast.add({ title: opration + '成功', color: 'green' });
    return true;
}

export class TestClient {
    async createTest(test: Test) {
        return await trpc.createTest.mutate(test);
    }
    async removeTestById(id: string) {
        return await trpc.removeTestById.mutate(id);
    }
    async findAllTest() {
        return await trpc.findAllTest.query();
    }
}