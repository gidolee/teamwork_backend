export interface CreateUserBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    jobRole: string;
    department: string;
    address: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender?: string;
    jobRole?: string;
    department?: string;
    address?: string;
    isAdmin: boolean;
    createdOn: Date;
}

export interface SignInBody {
    email: string;
    password: string;
}

export interface UpdateUserRole {
    email: string;
    isAdmin: boolean;
}
