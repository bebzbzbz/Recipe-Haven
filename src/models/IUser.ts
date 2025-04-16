interface IUser {
    user_metadata: any;
    id?: string | undefined,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
    img_url: string | undefined
}

export default IUser