import profile from '../../pages/profile.hbs';
import './profile.scss';
import Handlebars from "handlebars";
import ProfileInfo from '../../components/ProfileInfo/profileInfo';
import ProfileSelected from '../../components/ProfileSelected/profileSelected';
import { profilesList } from '../../models/profiles';
import { onCustomEvent } from '../../utils/event.js';

Handlebars.registerPartial('ProfileSelected', ProfileSelected);
Handlebars.registerPartial('ProfileInfo', ProfileInfo);

export default class Profile {
    container;
    template;
    profile;
    data = {
        profiles: profilesList
    };
    mode;

    constructor(container) {
        this.container = container;
    }

    displayTemplate() {
        this.container.innerHTML = profile(this.data);

        if (this.data?.profile) {
            document.getElementById('main').addEventListener('click', (event) => {
                const actionElement = event.target.closest('.action');
                const actionId = actionElement?.dataset?.id;
    
                if (!actionElement) {
                    return;
                }

                if (actionId === 'changeData') {
                    const newProfile = { ...this.data.profile };
                    const index = profilesList.indexOf(this.data.profile);

                    Object.keys(this.data.profile).forEach(key => {
                        newProfile[key] = document.getElementById(key)?.value;
                    });

                    newProfile.id = this.data.profile.id;
                    newProfile.imgSrc = this.data.profile.imgSrc;
                    newProfile.selected = this.data.profile.selected;
                    newProfile.name = this.data.profile.name;

                    profilesList[index] = newProfile;
                    this.data = { ...this.data, profile: newProfile };

                    this.displayTemplate();
                } else if (actionId === 'changePassword') {
                    this.mode = 'changePassword';
                    this.data.profile = { ...this.data.profile, mode: this.mode };
                    this.displayTemplate();
                } else if (actionId === 'exit') {
                    onCustomEvent('redirectSignIn');
                } else if (actionId === 'cancel') {
                    this.mode = null;
                    this.data.profile = { ...this.data.profile, mode: this.mode };
                    this.displayTemplate();
                } else if (actionId === 'save') {
                    
                } else if (actionId === 'changePhoto') {
                    const fileInput = document.getElementById('avatar');

                    fileInput.click();
                    fileInput.addEventListener('change', (event) => {
                        
                    });
                } else if (actionId === 'remove') {
                    const index = profilesList.indexOf(this.data.profile);

                    if (index !== -1) {
                        profilesList.splice(index, 1);
                        this.displayTemplate();
                    }
                }
            });
        }

        document.getElementById('profiles__sidebar__list').addEventListener('click', (event) => {
            const profileElement = event.target.closest('.profile');

            if (profileElement) {
                profilesList.forEach(item => item.selected = false);

                const profile = profilesList.find(profile => Number(profile.id) === Number(profileElement?.dataset?.id));
                profile.selected = true;

                this.data = { ...this.data, profile };
                this.displayTemplate();
            }
        });

        document.getElementById('profiles__sidebar__header').addEventListener('click', (event) => {
            onCustomEvent('chats');
        });
    }

    render() {
        this.displayTemplate();
    }
}
