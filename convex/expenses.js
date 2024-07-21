import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query(async (ctx) => {
  const expenses = await ctx.db.query("expenses").collect();
  return expenses.sort((a, b) => b.date - a.date);
});

export const create = mutation({
  args: {
    description: v.string(),
    amount: v.number(),
    date: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("expenses",
      {
        description: args.description,
        amount: args.amount,
        date: args.date,
      });
  },
});
