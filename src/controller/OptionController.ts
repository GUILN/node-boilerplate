import { desc, description, request, summary, tagsAll } from "koa-swagger-decorator";
import { Context, query } from "koa-swagger-decorator/dist";
import { ApplicationContainer } from "../container";


@tagsAll(["Options Resources"])
export default class OptionController {

    @request("get", "/decision/option")
    @summary("fetch all options that had been made")
    @description("fetch all decisions")
    public static async getAllOptions(ctx: Context): Promise<void> {
        let options = ApplicationContainer.reposContainer.archDecisionOptionRepo.getAll();
        ctx.response.body = options;
    }

}