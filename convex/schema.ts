import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	foodTypes: defineTable({
		brand: v.string(),
		calories: v.float64(),
		name: v.string(),
	}),
});
