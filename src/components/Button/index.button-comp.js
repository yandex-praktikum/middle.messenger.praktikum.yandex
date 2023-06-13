import Handlebars from 'handlebars';

export const button = ({text, url}) => Handlebars.compile(`
<button  onclick="window.location.href ='{{ url }}'">{{ text }}</button>`)({text, url})


export const buttonAwesome = ({icon, cl, url, title}) => Handlebars.compile(`
<button class="{{cl}}" onclick="window.location.href ='{{url}}'">
    <i class="{{icon}}" aria-hidden="true" title="{{title}}"></i>
</button>`)({icon, cl, url, title})
