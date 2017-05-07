
var MetorDOM = Metor.MetorDOM;

class App extends Metor.Component {
    constructor() {
        super();
        this.init();
    }

    onClick() {
        console.log('click button');
    }

    render() {
        return {
            name: 'div', 
            _style: "width: 100px; height: 100px; background: blue;",
            children: [
                {
                    name: 'button', 
                    children: ['点我'],
                    onClick: this.onClick.bind(this)
                }
            ]
        }
    }
}


MetorDOM.replace_element(
    document.getElementById('app'),
    MetorDOM.render(new App().render()));