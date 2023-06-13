export const template = `
<div class="container">
        <div class="panel right-panel">
            <div class="tools-container">
                <button>
                    <i class="fa-solid fa-angle-left"  aria-hidden="true" title="Settings" onclick="window.location.href ='/messages'"></i>
                </button>
                <button>
                    <i class="far fa-edit" aria-hidden="true" title="Settings" onclick="window.location.href ='/profile-edit'"></i>
                </button>
            </div>
            <div class="profile">
                <div class="avatar-container-profile">
                    <img src="{{avatar}}" alt="Avatar" title="Avatar">
                </div>
                <div class="profile-details">
                {{#each detail}}
                    <div class="detail">
                        <strong>{{this.label}}:</strong> <span>{{this.value}}</span>
                    </div>
                {{/each}}
                </div>
            </div>
        </div>
    </div>
`
