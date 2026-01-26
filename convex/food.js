import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query(async (ctx) => {
  const foodList = await ctx.db.query("food").collect();

  const foodWithImages = await Promise.all(
    foodList.map(async (food) => {
      return {
        ...food,
        // If imageStorageId exists, get the URL; otherwise, it's null
        imageUrl: food.imageStorageId
          ? await ctx.storage.getUrl(food.imageStorageId)
          : null,
      };
    })
  );

  return foodWithImages.sort((a, b) => {
    if (a.amount === 0) return 1;
    if (b.amount === 0) return -1;
    return 0;
  });
});

export const getByEan = mutation({
  args: { ean: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("food")
      .filter((q) => q.eq(q.field("ean"), args.ean))
      .unique();
  },
});

export const create = mutation({
  args: {
    brand: v.string(),
    name: v.string(),
    weight: v.number(),
    meatContent: v.number(),
    amountInBox: v.number(),
    storageId: v.id("_storage"),
    ean: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("food",
      {
        brand: args.brand,
        name: args.name,
        weight: args.weight,
        meatContent: args.meatContent,
        amount: args.amountInBox ?? 0,
        amountInBox: args.amountInBox ?? 12,
        imageStorageId: args.storageId,
        ean: args.ean,
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
