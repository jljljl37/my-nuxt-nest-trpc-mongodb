import { z } from "zod";

export class Test {
    info?: string
    user?: string
    status?: string
}

export const TestZod = z.object({
    info: z.string().optional(),
    user: z.string().optional(),
    status: z.string().optional()
});