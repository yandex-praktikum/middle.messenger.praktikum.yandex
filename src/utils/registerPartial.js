import Handlebars from 'handlebars';

import FormInput from '../components/Inputs/FormInput/FormInput';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import LinkButton from '../components/Buttons/LinkButton';
import ChatItem from '../pages/Chats/components/Item/Item';
import ChatList from '../pages/Chats/components/List/List';
import ChatSpace from '../pages/Chats/components/Space/Space';
import Panel from '../pages/Chats/components/Panel/Panel';
import Chat from '../pages/Chats/components/Chat/Chat';
import Message from '../components/Message/Message';
import WithoutChat from '../pages/Chats/components/WithoutChat/WithoutChat';
import angleRight from '../components/icons/angleRight';
import angleLeft from '../components/icons/angleLeft';
import ellipsisVertical from '../components/icons/ellipsisVertical';
import paperclip from '../components/icons/paperclip';
import search from '../components/icons/search';
import image from '../components/icons/image';
import file from '../components/icons/file';
import location from '../components/icons/location';
import add from '../components/icons/add';
import remove from '../components/icons/remove';
import trash from '../components/icons/trash';
import photo from '../components/icons/photo';
import pen from '../components/icons/pen';
import xmark from '../components/icons/xmark';
import leftArrow from '../components/icons/leftArrow';
import hand from '../components/icons/hand';
import otter from '../components/icons/otter';
import lock from '../components/icons/lock';
import pencil from '../components/icons/pencil';
import exit from '../components/icons/exit';
import plus from '../components/icons/plus';
import MembersMenu from '../components/Menu/MembersMenu';
import FilesMenu from '../components/Menu/FilesMenu';
import Modal from '../pages/Chats/components/Modal/Modal';
import MembersModal from '../components/MembersModal/MembersModal';
import ImageInput from '../components/inputs/ImageInput/ImageInput';
import Item from '../pages/Profile/components/Item/Item';
import Body from '../pages/Profile/components/Body/Body';
import Footer from '../pages/Profile/components/Footer/Footer';
import ProfileHeader from '../pages/Profile/components/Header/Header';
import IconButton from '../components/Buttons/IconButton';
import ImagePreview from '../components/ImagePreview/ImagePreview';
import Form from '../components/Form/Form';
import Avatar from '../components/Avatar/Avatar';
import Content from '../components/Content/Content';
import Info from '../components/Info/Info';
import ChatHeader from '../pages/Chats/components/Header/Header';
import ChatBody from '../pages/Chats/components/Body/Body';
import ChatFooter from '../pages/Chats/components/Footer/Footer';
import TextInput from '../components/Inputs/TextInput/TextInput';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

export const registerPartial = () => {
  Handlebars.registerPartial('AngleRightIcon', angleRight);
  Handlebars.registerPartial('AngleLeftIcon', angleLeft);
  Handlebars.registerPartial('EllipsisIcon', ellipsisVertical);
  Handlebars.registerPartial('PaperclipIcon', paperclip);
  Handlebars.registerPartial('SearchIcon', search);
  Handlebars.registerPartial('ImageIcon', image);
  Handlebars.registerPartial('FileIcon', file);
  Handlebars.registerPartial('LocationIcon', location);
  Handlebars.registerPartial('AddIcon', add);
  Handlebars.registerPartial('RemoveIcon', remove);
  Handlebars.registerPartial('TrashIcon', trash);
  Handlebars.registerPartial('PhotoIcon', photo);
  Handlebars.registerPartial('PenIcon', pen);
  Handlebars.registerPartial('XmarkIcon', xmark);
  Handlebars.registerPartial('LeftArrowIcon', leftArrow);
  Handlebars.registerPartial('HandIcon', hand);
  Handlebars.registerPartial('OtterIcon', otter);
  Handlebars.registerPartial('LockIcon', lock);
  Handlebars.registerPartial('PencilIcon', pencil);
  Handlebars.registerPartial('ExitIcon', exit);
  Handlebars.registerPartial('PlusIcon', plus);
  Handlebars.registerPartial('FormInput', FormInput);
  Handlebars.registerPartial('PrimaryButton', PrimaryButton);
  Handlebars.registerPartial('LinkButton', LinkButton);
  Handlebars.registerPartial('ChatItem', ChatItem);
  Handlebars.registerPartial('ChatList', ChatList);
  Handlebars.registerPartial('ChatSpace', ChatSpace);
  Handlebars.registerPartial('ChatsPanel', Panel);
  Handlebars.registerPartial('Chat', Chat);
  Handlebars.registerPartial('Message', Message);
  Handlebars.registerPartial('WithoutChat', WithoutChat);
  Handlebars.registerPartial('MembersMenu', MembersMenu);
  Handlebars.registerPartial('FilesMenu', FilesMenu);
  Handlebars.registerPartial('Modal', Modal);
  Handlebars.registerPartial('MembersModal', MembersModal);
  Handlebars.registerPartial('ImageInput', ImageInput);
  Handlebars.registerPartial('ProfileItem', Item);
  Handlebars.registerPartial('ProfileBody', Body);
  Handlebars.registerPartial('ProfileFooter', Footer);
  Handlebars.registerPartial('ProfileHeader', ProfileHeader);
  Handlebars.registerPartial('ImagePreview', ImagePreview);
  Handlebars.registerPartial('IconButton', IconButton);
  Handlebars.registerPartial('Form', Form);
  Handlebars.registerPartial('Avatar', Avatar);
  Handlebars.registerPartial('Content', Content);
  Handlebars.registerPartial('Info', Info);
  Handlebars.registerPartial('ChatHeader', ChatHeader);
  Handlebars.registerPartial('ChatBody', ChatBody);
  Handlebars.registerPartial('ChatFooter', ChatFooter);
  Handlebars.registerPartial('TextInput', TextInput);
  Handlebars.registerPartial('ErrorMessage', ErrorMessage);
};

export default registerPartial;


