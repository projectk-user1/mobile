export interface User {
    id: number;
    aboutSelf: string;
    address: string;
    age:string;
    caste:string;
    complexion:string;
    distance:string;
    dob:string;
    education:string;
    email:string;
    firstname: string;
    gender:string;
    height:string;
    lastname: string;
    maritalstatus:string;
    maternalGotram:string;
    mobileno:string;
    occupation:string;
    paternalGotram:string;
    photoLink:string;
    rasi:string;
    salary:string;
    star:string;
    userId:string;
    videoLink:string;

}
export interface IUserPrefs {
    CASTE: IFieldMap[];
    COMPLEXION:IFieldMap[];
    EDUCATION:IFieldMap[];
    FAMILY_STATUS: IFieldMap[]; 
    FAMILY_TYPE: IFieldMap[]; 
    FAMILY_VALUES: IFieldMap[]; 
    GOTRAM:IFieldMap[]; 
    MARITAL_STATUS: IFieldMap[];
    OCCUPATION:IFieldMap[];
    RASI: IFieldMap[];
    RELIGION: IFieldMap[];
    STAR: IFieldMap[];
    TAG:IFieldMap[];
    MSGTMPLT:IFieldMap[];
}
export interface IFieldMap{
    fieldName: string;
    fieldType: string;
    fieldValue: string;
    id?: number;
    icon?: string;
    parentKy: number;
}