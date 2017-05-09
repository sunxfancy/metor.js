
export abstract class Component<T, K> {
    constructor(props:T, children?: Component<any,any>[]) {
        this.props = props;
        this.children = children;
        // this.last_props = props;
    }

    public props: T
    public state: K
    public children: Component<any,any>[] | undefined

    public abstract init(): void;

    public update(): void {
        
    }

    // protected last_props: T
    public html_node: HTMLElement | Text

    public abstract render();
}