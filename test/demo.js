
var MetorDOM = Metor.MetorDOM;
var Property = Metor.Property;
var testDom = Metor.dom;

class Item extends Metor.Component {
    render() {
        console.log(this.props.text.data);
        return {
            name: 'h2',
            children: [
                '你好，'+this.props.metor, 
                {name: 'br'}, 
                this.props.text.data
            ]
        }
    }
}


class App extends Metor.Component {
    constructor() {
        super();
        this.text = new Property("");
        this.text.onChange = this.onChange.bind(this);
    }

    init() {
        console.log("App mount");
        this.text = "XXX";
    }

    onClick() {
        this.text.data = '';
        console.log('click button');
    }

    onChange(value) {
        console.log(value);
    }

    render() {
        return {
            name: 'div', 
            _style: "width: 300px; height: 200px; background: blue;",
            children: [
                {
                    name: 'button', 
                    children: ['点我清除'],
                    _onclick: this.onClick.bind(this)
                },
                {
                    name: 'input',
                    bind: this.text
                },
                new Item({metor: 'Metor', text: this.text})
            ]
        }
    }
}

MetorDOM.bootstrap('app', testDom);

MetorDOM.replace_element(
    document.getElementById('hello').childNodes[0], 
    MetorDOM.render('Hello'));