interface IUser {
    user_metadata?: any;
    id?: string | undefined,
    username: string | undefined,
    firstname?: string,
    lastname?: string,
    email: string | undefined,
    password?: string
    img_url: string | undefined
}

export default IUser