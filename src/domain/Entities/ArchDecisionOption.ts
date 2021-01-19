export default class ArchDecisionOption {
    private readonly name?: string;
    private readonly description?: string;

    constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }

    private score?: number;
}