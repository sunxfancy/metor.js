
import {Component} from './Component'
import {Property} from './Property'

const default_label = ['class', 'style', 'id', 'for', 'type'];

export class MetorDOM {
    public static render(json: any): HTMLElement|Text {
        if (!json) return document.createTextNode("");
        if (typeof(json) == 'string') 
            return document.createTextNode(json);
        if (json.name) {  // html 标签
            let node = document.createElement(json.name);
            
            if (json.name == 'input' && json.bind) {
                let binder = new Property<string>();
                MetorDOM.bindInput(node, binder);
                binder.bind(json.bind);
            }

            for (var i in json) {
                if (i.charAt(0) == '_') {
                    let name = i.substring(1);
                    if (name.substr(0,2) == 'on') node[name] = json[i];
                    else node.setAttribute(name, json[i]);
                } else if (default_label.indexOf(i) != -1) {
                    node.setAttribute(i, json[i]);
                }
            }
            if (json.children)
                for (let i of json.children) 
                    node.appendChild(MetorDOM.render(i));
            return node;
        } else { // 自定义标签
            let obj = json as Component<any>;
            let node = obj.render();
            let ans = MetorDOM.render(node);
            obj.html_node = ans;
            if (obj.init) obj.init(); 
            return ans;
        }
    }

    public static rename_element(node, name:string) {
        var renamed = document.createElement(name); 
        for (var a of node.attributes) {
            renamed.setAttribute(a.nodeName, a.nodeValue);
        }
        while (node.firstChild) {
            renamed.appendChild(node.firstChild);
        }
        return node.parentNode.replaceChild(renamed, node);
    }

    public static replace_element(node: HTMLElement, newnode: Node) {
        return node.parentNode!.replaceChild(newnode, node);
    }

    public static bootstrap(id: string, c: Component<any>) {
        let node = document.getElementById(id);
        if (!node) return console.warn('Element can not be found');
        MetorDOM.replace_element(
            node as HTMLElement,
            MetorDOM.render(c));
    }


    private static bindInput(node: HTMLInputElement, prop: Property<string>) {
        node.onkeyup = (e) => { prop.data = node.value; }
        prop.onChange = (val) => { node.value = val; }
    }
} 