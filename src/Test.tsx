
import {React} from './React'
import {Component} from './Component'

export class App extends Component<any> {
    onClick() {
        console.log("click");
        this.text = 'Button Click!';
        this.update();
    }

    text = 'Well done!';

    render() {
        return <div id={this.props.id}>
            <h2>你好, {this.props.name}</h2>
            <div class='row'>
                <div class='col-12'>
                    <div class="alert alert-success" role="alert">
                        <h4 class="alert-heading">{this.text}</h4>
                        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                        <button class='btn' _onclick={this.onClick.bind(this)} >点我试试</button>
                    </div>
                </div>
            </div>
        </div>
    }
}

export var dom = (
    <div class='container'>
        <App id='app' name='Metor'></App>
    </div>
)
