import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { TestRepository } from './mongodb/test_repository';
// import {  } from './mongodb/db';

@Module({
    imports: [],
    controllers: [],
    providers: [ TrpcService, TrpcRouter, TestRepository ],
})
export class TrpcModule { }