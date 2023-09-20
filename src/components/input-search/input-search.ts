import {IProps,Block} from "../../utils/Block";

interface IInputSearch extends IProps{
    name: string,
    value: string,
    errorText: string,
    error:boolean ,
}

export class InputSearch extends Block {

    constructor(props:IInputSearch) {
        props.errorText='';
        props.error=false;
        super(props);

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
        const { name = '', value = ''} = this._props as IInputSearch;

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
