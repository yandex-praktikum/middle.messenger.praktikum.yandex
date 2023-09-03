import './ImagePreview.scss';

// language=hbs
export default `
    <div class='image-preview'>
        {{# if withAddIcon }}
            {{> 'IconButton'
                class='button_action button_add'
                title='Удалить фото'
                icon='PlusIcon'
                iconClass='icon_blue'
            }}
        {{/if}}
        {{# if withRemoveIcon }}
            {{> 'IconButton'
                class='button_action button_remove'
                title='Удалить фото'
                icon='XmarkIcon'
                iconClass='icon_blue'
            }}
        {{/if}}
        <img class='previewImage' src='{{ createHref img }}' alt='Загруженное фото' />
    </div>
`;
