import {httpRouter} from "convex/server";
import {httpAction} from "./_generated/server";
import {api} from './_generated/api';

const http = httpRouter();

http.route({
  path: "/eat-last-food",
  method: "PATCH",
  handler: httpAction(async (ctx, request) => {
    const foodList = await ctx.runQuery(api.food.list)
      .then((data) =>
        data.filter((food) => food.amount > 0)
      );

    if (foodList.length === 0) {
      return new Response('No available food', {status: 422});
    }

    const latestFood = foodList[0];
    const result = await ctx.runMutation(api.food.update, {
      id: latestFood._id,
      amount: latestFood.amount,
      amountChange: -1
    });

    return new Response(`Successfully updated food\nLog ID: ${result}`, {status: 200});
  }),
});

export default http;
