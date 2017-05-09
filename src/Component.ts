
import {MetorDOM} from './MetorDOM'
import {React} from './React'

export interface Tree {
    name?: string,
    key?: any,
    [key:string]: any
    children: Tree[]
}

export abstract class Component<T> implements Tree {
    constructor(props:T, children: Tree[]) {
        this.props = props;
        this.children = children;
        // this.last_props = props;
    }

    public props: T
    public children: Tree[]
    public refs: {[key: string]: Tree}

    public mount?: () => void
    public unmount?: () => void

    public update(): void {
        React.now_component = this;
        let new_dom = this.render();
        this.diff(this.last_dom, new_dom, this.html_node);
        this.last_dom = new_dom;
    }

    public updateProps(props, children) {
        this.props = props;
        this.children = children;
        this.update();
    }


    protected diff(old_dom: Tree, new_dom: Tree, real_dom: HTMLElement) {
        // console.log('diff', old_dom, new_dom, real_dom);
        if (old_dom && new_dom) {
            if (typeof(old_dom) == 'string' || typeof(new_dom) == 'string')  {
                if (!(typeof(old_dom) == 'string' && typeof(new_dom) == 'string' && old_dom == new_dom)) { // 除了两个字符串完全相等
                    var new_node = MetorDOM.render(new_dom);
                    MetorDOM.replace_element(real_dom, new_node);   // 直接重新渲染
                    if (old_dom instanceof Component && old_dom.unmount) old_dom.unmount();
                    if (new_dom instanceof Component && new_dom.mount) new_dom.mount();
                    return new_node;
                }

            } else if (!(old_dom instanceof Component) && !(new_dom instanceof Component) 
                && old_dom.name == new_dom.name) { // 两个普通的tag，名称一样，则比较属性和子节点

                this.diffAttr(old_dom, new_dom, real_dom);
                this.diffChildren(old_dom, new_dom, real_dom);
                return real_dom;

            } else if (old_dom instanceof Component && new_dom instanceof Component 
                && old_dom==new_dom) { // 两个custom的tag，并且构造函数相同，比较属性和子节点
                
                // if (!this.checkAttr(old_dom, new_dom))
                //     new_dom.updateProps(new_dom.props, new_dom.children);
                return real_dom;
                
            } else { // 类型不一样或tag名不一样，则直接替换成新节点
                var new_node = MetorDOM.render(new_dom);
                MetorDOM.replace_element(real_dom, new_node); // 先渲染出结果，如果异常则不unmount
                if (old_dom instanceof Component && old_dom.unmount) old_dom.unmount();
                if (new_dom instanceof Component && new_dom.mount) new_dom.mount();
                return new_node;
            }
        } else {
            console.warn('found null tree when diff trees');
            return real_dom;
        }
    }

    protected diffAttr(old_dom: Tree, new_dom: Tree, real_dom: HTMLElement) { // 必须是两个相同的节点
        for (var key in old_dom) {
            if (key != 'name' && key != 'children' && new_dom[key] == undefined)  // 删除多余的属性
                real_dom.removeAttribute(key);
        }
        for (var key in new_dom) {
            if (key != 'name' && key != 'children' && old_dom[key] != new_dom[key]) // 添加不同的属性
                real_dom.setAttribute(key, new_dom[key]);
        }
    }

    protected diffChildren(old_dom: Tree, new_dom: Tree, real_dom: HTMLElement) {

        for (var key = 0; key < old_dom.children.length; ++key) {  // 删去新dom中没有的节点
            var value = old_dom.children[key];
            var now_dom = real_dom.childNodes[key];

            if (!new_dom.children[key]) {
                real_dom.removeChild(now_dom);
            } else {
                this.diff(old_dom.children[key], new_dom.children[key], now_dom as HTMLElement);
            }
        }

        for (var key = 0; key < new_dom.children.length; ++key) { // 添加新节点
            var value = new_dom.children[key];
            if (!old_dom.children[key]) {
                real_dom.appendChild(MetorDOM.render(value));
            }
        }
    }

    protected foundKey(array: Tree[], key:any) {
        var count = 0;
        array.forEach((ele, idx) => {
            if (ele.key == key) count++;
        });
        return count != 0;
    }
    
    protected checkAttr(old_dom: Tree, new_dom: Tree) : boolean {
         return JSON.stringify(old_dom) === JSON.stringify(new_dom);
    }

    // protected last_props: T
    public html_node: HTMLElement
    protected last_dom: any;

    public renderDOM() {
        React.now_component = this;
        this.last_dom = this.render();
        return this.last_dom;
    }

    public abstract render(): Tree;
}