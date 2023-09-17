import Block from "../../utils/Block";

interface IInputSearch {
    name: string,
    value: string
}

export class InputSearch extends Block {

    constructor(props:IInputSearch) {
        super({
            ...props,
            errorText: '', error:false,
        });

    }

    public value() {

        return this.refs?.input?.value()
    }

/*    private validate() {
        console.log(this)
        const value =this.refs?.input?.value();
        const error = this.props.validate(value);

        console.log('value,error',value,error)
        this.props.value=value;
        if (error) {
            this.setProps({...this.props, errorText: error,error:true});
            return false;
        }
        this.setProps({...this.props, errorText: '',error:false} );
        return true;
    }*/

    protected render(): string {
        const { name = '', value = ''} = this.props;

        return (`
           <label class="input-search">
                <span class="input-search__label">Search...</span>
                {{{ Input 
                    ref='input' 
                    type="text"
                    classes="input-search__value" 
                    value='${value}'
                    name="${name}"
                    placeholder=' '
                }}}
            </label>
        `)
    }
}
