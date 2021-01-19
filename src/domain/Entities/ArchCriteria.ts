export default class ArchCriteria {
    private readonly name?: string;
    private readonly description?: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}