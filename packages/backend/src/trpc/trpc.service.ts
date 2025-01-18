import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';

@Injectable()
export class TrpcService {
    t = initTRPC.create();
    publicProcedure = this.t.procedure
    router = this.t.router;
    // 未使用，可进行权限管理等
    userProcedure = this.t.procedure.use(async ({ ctx, next }) => {
        return next({
            ctx: {
                name: "checked username"
            }
        })
    });
}