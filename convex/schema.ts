import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	food: defineTable({
		brand: v.string(),
		name: v.string(),
		calories: v.number(),
		amount: v.number()
	}),
});
