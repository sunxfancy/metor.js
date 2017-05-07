
import {Component} from './Component'

export class MetorDOM {
    public static render(json: any): HTMLElement|Text {
        if (typeof(json) == 'string') 
            return document.createTextNode(json);
        let node = document.createElement(json.name);
        
        node.setAttribute('style', json._style);
        if (json.onClick) {
            node.onclick = json.onClick;
        }
        if (json.children)
            for (let i of json.children) 
                node.appendChild(MetorDOM.render(i));
        return node;
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

    public static replace_element(node, newnode) {
        return node.parentNode.replaceChild(newnode, node);
    }

    public static bootstrap(id: string, c: Component) {
        MetorDOM.replace_element(
            document.getElementById('app'),
            MetorDOM.render(c.render()));
    }
} 