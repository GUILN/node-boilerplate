import { desc, description, request, summary, tagsAll } from "koa-swagger-decorator";
import { Context, query } from "koa-swagger-decorator/dist";
import ArchDecisionOptionRepo from "../domain/repositories/ArchDecisionOptionRepo";
import ArchDecisionOptionSqliteRepo from '../infra/repos/sqlite/ArchDecisionOptionSqliteRepo';

@tagsAll(["DecisionController"])
export default class DecisionController {

    private archDecisionOptionRepo?: ArchDecisionOptionRepo;
    constructor() {
        this.archDecisionOptionRepo = new ArchDecisionOptionSqliteRepo();
    }

    @request("get", "/decision")
    @summary("fetch all decisions that had been made")
    @description("fetch all decisions")
    public static async getAllDecisions(ctx: Context): Promise<void> {
        ctx.response.body = {"Decision": ""};
    }
}