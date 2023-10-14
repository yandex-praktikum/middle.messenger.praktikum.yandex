import './info-bar.sass';
import infoBarTmpl from './info-bar.hbs?raw';
import Block, { Props } from '../../core/Block';
import { goToProfile } from '../../services/routes';
import { connect } from '../../utils/connect';

class InfoBar extends Block {
    protected constructor(props: Props = {}) {
        super({
            ...props,
            getDisplayName: () => (
                props?.displayName || (props?.secondName || '') + (props?.firstName || '')
            ),
            onSettings: (event: Event | undefined) => {
                if (!event) return;
                event.preventDefault();
                goToProfile();
            },
        });
    }

    protected render(): string {
        return infoBarTmpl;
    }
}

export default connect(({
    user,
}) => (user || {}))(InfoBar);
