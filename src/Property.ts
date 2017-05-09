import {Component} from './Component'

export class Property<T> {
    protected _data: T
    constructor(d?: T) { 
        if (d) this._data = d;
    }
    get data() : T {
        return this._data;
    }
    set data(val) {
        if (this.binder) 
            this.binder.forEach(ele => { ele._data = val; if (ele.onChange) ele.onChange(val);} );
        else this._data = val;
        if (this.onChange) this.onChange(val); 
    }

    public bind(prop: Property<T>) : Property<T> {
        if (this.binder && !prop.binder) { prop.binder = this.binder; this.binder.push(prop); }
        if (!this.binder && prop.binder) { this.binder = prop.binder; this.binder.push(this); }
        if (this.binder && prop.binder) {
            if (this.binder == prop.binder) console.warn('two properties has already bound');
            else this.binder = prop.binder = this.binder.concat(prop.binder);
        }
        if (!this.binder && !prop.binder)
            this.binder = prop.binder = [this, prop];
        return this;
    }

    protected binder: Property<T>[];
    public onChange: (val)=>void;
}