
export abstract class Component {
    public init(): void {
        console.log("init component");
    }

    public abstract render();
}