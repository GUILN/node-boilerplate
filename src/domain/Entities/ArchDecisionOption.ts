export default class ArchDecisionOption {
    public readonly name?: string;
    public readonly description?: string;

    constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }

    private score?: number;
}