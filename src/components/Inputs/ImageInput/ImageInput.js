import './ImageInput.scss';

// language=hbs
export default `
    <div class='custom-file-upload'>
        <input name='add_file' type='file' accept='image/*' />
        {{> 'ImagePreview' img=avatar withAddIcon=withAddIcon withRemoveIcon=withRemoveIcon iconClass='icon_blue' }}
        {{> 'ErrorMessage' errorText=errorText }}
    </div>
`;
