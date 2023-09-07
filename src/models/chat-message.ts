import {File} from "./file";

export interface ChatMessage {
    id: number;
    user_id: number;
    chat_id: number;
    time: string;
    type: string;
    content: number | string;
    file?: File;
    main?: boolean;
}
