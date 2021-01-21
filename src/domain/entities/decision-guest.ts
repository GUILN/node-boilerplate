export default class DecisionGuest {
    public readonly isCreator: boolean;
    public readonly name: string;

    constructor(name: string, isCreator: boolean=false) {
        this.isCreator = isCreator;
        this.name = name;
    }
}