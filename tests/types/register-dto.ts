export interface RegisterDto {
    firstName: string | null;
    lastName: string;
    email: string;
    userName: string;
    dateOfBirth: Date;
    gender: string;
    acceptedTerms: boolean;
    password: string,
    confirmPassword: string,
    hobbies: string[],
    documents: File[];  // array of uploaded files
    notes: string
}