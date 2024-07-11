export interface ProfileDataType {
    title: string,
    type: 'text' | 'tel' | 'email' | 'password',
    value?: string,
    isDisable?: boolean,
    name: string,
    placeholder: string
}
