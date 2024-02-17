import { ExpressContext } from '@/server';
import { initTRPC } from '@trpc/server';

const trpcContext = initTRPC.context<ExpressContext>().create();

export const router = trpcContext.router;
export const publicProcedure = trpcContext.procedure;

 
