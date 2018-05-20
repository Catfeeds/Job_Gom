
{{each data}}
    {{ if $index== 0 }}
        <li  class="active"> 
            <img src={{$value}} alt="">
        </li>
    {{else}}
        <li> 
            <img src={{$value}} alt="">
        </li>
    {{/if}}
{{/each}}
