import { Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { z } from "zod";

import { TestRepository } from "./mongodb/test_repository";
import { TestZod } from "./mongodb/test";
import { get } from "mongoose";

// import {  } from "./mongodb/db";

@Injectable()
export class TrpcRouter {
    constructor(
        private readonly trpc: TrpcService,
        private readonly testRepository: TestRepository
    ) {}

    appRouter = this.trpc.router({
        hello: this.trpc.publicProcedure.query(({ input }) => {
            return "hello world";
        }),
        // 未设置output
        createTest: this.trpc.publicProcedure
            .input(TestZod)
            .mutation(async ({ input }) => {
                return this.testRepository.create(input);
            }),
        removeTestById: this.trpc.publicProcedure
            .input(z.string())
            .mutation(async ({ input }) => {
                return this.testRepository.removeById(input);
            }),
        updateTestById: this.trpc.publicProcedure
            .input(z.object({ id: z.string(), test:TestZod }))
            .mutation(async ({ input }) => {
                return this.testRepository.updateById(input.id, input.test);
            }),
        findTestById: this.trpc.publicProcedure
            .input(z.string())
            .query(async ({ input }) => {
                return this.testRepository.findById(input);
            }),
        findAllTest: this.trpc.publicProcedure.query(async () => {
            return this.testRepository.findAll();
        }),
    })
}

export type AppRouter = TrpcRouter["appRouter"]