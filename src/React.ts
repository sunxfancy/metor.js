
export class React {
    public static createElement<T> (
        ctor: string | (new (props, children) => T), 
        props: { [key: string]: any }, 
        ...children: any[]
    ) {
        if (typeof(ctor) == 'string') {
            if (props) {
                props.name = ctor;
                props.children = children;
                return props;
            } else {
                return {
                    name: ctor,
                    children: children
                }
            }
        } else {
            return new ctor(props, children);
        }
    }
}