import { desc, description, request, summary, tagsAll } from "koa-swagger-decorator";
import { Context, query } from "koa-swagger-decorator/dist";

@tagsAll(["DecisionController"])
export default class DecisionController {

    @request("get", "/decision")
    @summary("fetch all decisions that had been made")
    @description("fetch all decisions")
    public static async getAllDecisions(ctx: Context): Promise<void> {
        ctx.response.body = {"Decision": "decision"};
    }
}