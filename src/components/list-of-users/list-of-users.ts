import './list-of-users.sass';
import listOfUsersTmpl from './list-of-users.hbs?raw';

import Block from '../../core/Block';
import { connect } from '../../utils/connect';

class ListOfUsers extends Block {
    protected render(): string {
        return listOfUsersTmpl;
    }
}

export default connect(({ searchChatUsers, currentChatUsers }) => ({
    searchChatUsers, currentChatUsers,
}))(ListOfUsers);
