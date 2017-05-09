
import {Component, Tree} from './Component'

export class React {
    public static now_component: Component<any>;

    public static createElement<T extends Component<any>> (
        ctor: string | (new (props, children) => T), 
        props: { [key: string]: any }, 
        ...children: Tree[]
    ): Tree {
        if (props && props.ref) {
            if (this.now_component.refs[props.ref]) { // refs 已有则更新
                if (typeof(ctor) == 'string') {
                    delete props.ref;
                    Object.assign(this.now_component.refs[props.ref], this.create<T>(ctor, props, children));
                } else {
                    this.now_component.refs[props.ref].updateProps(props, children);
                }
            } else { // refs 没有则创建，并缓存
                this.now_component.refs[props.ref] = this.create<T>(ctor, props, children);
            }
        }
        return this.create(ctor, props, children);
    }

    static create<T extends Component<any>>(
        ctor: string | (new (props, children) => T), 
        props: { [key: string]: any }, 
        children: Tree[]
    ) : Tree {
        // 为子元素自动生成key
        // children.forEach((element, index) => {
        //     if (typeof(element) == "object")
        //         element.key = index;
        // });
        if (typeof(ctor) == 'string') {
            if (props) {
                props.name = ctor;
                props.children = children;
                return props as Tree;
            } else {
                return {
                    name: ctor,
                    children: children
                }
            }
        } else {
            return new ctor(props, children) as Tree;
        }
    }
}