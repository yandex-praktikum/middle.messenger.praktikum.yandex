const message = `
<form class="message__form form">
    <div class="form__modal-menu form__modal-menu_hidden modal-menu"> 
        <div class="modal-menu__inner">
            <div class="modal-menu__item">
                <label for="photo-msg" class="modal-menu__label">
                    <img src="../../../static/images/photo-video.svg" alt="Photo or Video" class="modal-menu__img"> 
                    <button class="modal-menu__text" type="button">
                        <label for="photo-msg">Фото или Видео</label> 
                    </button> 
                    <input type="file" class="modal-menu__input" id="photo-msg" name="photo-msg" hidden=""> 
                </label> 
            </div> 
            <div class="modal-menu__item"> 
                <label for="file-msg" class="modal-menu__label"> 
                    <img src="../../../static/images/file.svg" alt="File" class="modal-menu__img"> 
                    <button class="modal-menu__text" type="button"> 
                        <label for="file-msg">Файл</label> 
                    </button> 
                    <input type="file" class="modal-menu__input" id="file-msg" name="file-msg" hidden=""> 
                </label> 
            </div>
            <div class="modal-menu__item"> 
                <label for="file-msg" class="modal-menu__label"> 
                    <img src="../../../static/images/location.svg" alt="Location" class="modal-menu__img"> 
                    <button class="modal-menu__text" type="button"> 
                        <label for="file-msg">Локация</label>
                    </button>
                    <input type="file" class="modal-menu__input" id="file-msg" name="file-msg" hidden=""> 
                </label> 
            </div>
        </div> 
    </div>
    <div class="form__utils">
        {{{attachButton}}}
    </div>
    <div class="form__messagearea-block">
        {{{textArea}}}
    </div>
    <div class="form__btn-send-block">
        {{{sendButton}}}
    </div>
</form>
`;

export { message };
