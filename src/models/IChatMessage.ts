import {IFile} from "./IFile.ts";

export interface IChatMessage {
    id: number;
    user_id: number;
    chat_id: number;
    time: string;
    type: string;
    content: number | string;
    file?: IFile;
    main?: boolean;
}
