import Handlebars from 'handlebars';

export const input = ({text, type, name, placeholder}) => Handlebars.compile(` 
                        <div class="input">
                        <div class="name">
                            <p>{{text}}</p>
                        </div>
                        <input type="{{type}}" name="{{name}}" placeholder="{{placeholder}}">
                    </div>
`)({text, type, name, placeholder});

export const simply_input = ({text, type, name, placeholder}) => Handlebars.compile(` 
                        <input type="{{type}}" name="{{name}}" placeholder="{{placeholder}}">
`)({text, type, name, placeholder})



