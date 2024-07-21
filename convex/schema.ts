import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	food: defineTable({
		brand: v.string(),
		name: v.string(),
		weight: v.number(),
		meatContent: v.number(),
		amount: v.number(),
	}),
	foodLog: defineTable({
		foodId: v.id('food'),
		amountChange: v.number(),
	}),
	expense: defineTable({
		description: v.string(),
		amount: v.number(),
		date: v.string(),
	}),
});
