import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    brand: v.string(),
    name: v.string(),
    calories: v.number()
  },
  handler: async (ctx, args) => {
    const newFoodTypeId = await ctx.db.insert("foodTypes",
      {
        brand: args.brand,
        name: args.name,
        calories: args.calories,
      });
    console.log(newFoodTypeId);
    return newFoodTypeId;
  },
});
