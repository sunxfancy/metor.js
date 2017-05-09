
import {MetorDOM} from './MetorDOM'

interface Tree {
    name?: string,
    [key:string]: any
    children?: Tree
}

export abstract class Component<T> implements Tree {
    constructor(props:T, children?: Tree) {
        this.props = props;
        this.children = children;
        // this.last_props = props;
    }

    public props: T
    public children: Tree | undefined

    public init(): void {}

    public update(): void {
        let new_dom = this.render();
        this.diff(this.last_dom, new_dom, this.html_node);
    }

    protected diff(old_dom: Tree, new_dom: Tree, real_dom: Node) {
        
    }

    // protected last_props: T
    public html_node: Node
    protected last_dom: any;

    public renderDOM() {
        this.last_dom = this.render();
        return this.last_dom;
    }

    public abstract render(): Tree;
}