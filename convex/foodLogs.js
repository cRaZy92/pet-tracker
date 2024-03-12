import { query } from './_generated/server';

export const getLastSevenDays = query(async (ctx, args) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const logs = await ctx.db
      .query("foodLog")
      .filter((q) => q.and(q.gte(q.field("_creationTime"), sevenDaysAgo.getTime()), q.lt(q.field("amountChange"), 0)))
      .order("desc")
      .collect();

  return await Promise.all(
    (logs ?? []).map(async (log) => ({
        ...log,
        food: await ctx.db.get(log.foodId)
      }))
  );
});

export const getAll = query(async (ctx, args) => {
  const logs = await ctx.db
    .query("foodLog")
    .order("desc")
    .collect();

  return await Promise.all(
    (logs ?? []).map(async (log) => ({
      ...log,
      food: await ctx.db.get(log.foodId)
    }))
  );
});

