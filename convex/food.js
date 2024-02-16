import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query(async (ctx) => {
  return await ctx.db.query("food").collect();
});

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

export const update = mutation({
  args: {
    id: v.id('food'),
    amount: v.number(),
    amountChange: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id,
      {
        amount: args.amount + args.amountChange,
      }).then(() => {
        return ctx.db.insert("foodLog",
        {
          foodId: args.id,
          amountChange: args.amountChange,
        });
    });
  },
});
