export namespace Auth{
  export interface ILogin {
    email: string,
    password: string
  }
  export interface IRegister{
    userName:string,
    email:string,
    country :string,
    phoneNumber :string,
    profileImage:File,
    password:string,
    confirmPassword:string
  }
  export interface IVerifyAccount{
    email: string,
    code: string
  }
  export interface IForgetPass{
    email: string,
  }

  export interface IResetPass{
    seed:string,
    email:string,
    password:string,
    confirmPassword:string
  }
}

