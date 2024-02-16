import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    brand: v.string(),
    name: v.string(),
    calories: v.number(),
    amount: v.number()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("food",
      {
        brand: args.brand,
        name: args.name,
        calories: args.calories,
        amount: args.amount,
      });
  },
});
