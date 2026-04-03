import { Request } from 'express';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    gender: string;
    job_role: string;
    department: string;
    address: string;
    is_admin: boolean;
    created_on: Date;
}

export interface Article {
    id: number;
    author_id: number;
    title: string;
    article: string;
    created_on: Date;
}

export interface Gif {
    id: number;
    author_id: number;
    title: string;
    image_url: string;
    created_on: Date;
}

export interface Comment {
    id: number;
    author_id: number;
    article_id: number | null;
    gif_id: number | null;
    comment: string;
    created_on: Date;
}

export interface FeedItem {
    id: number;
    type: 'article' | 'gif';
    created_on: Date;
    title: string;
    article?: string;
    url?: string;
    author_id: number;
}

export interface JwtPayload {
    id: number;
    email: string;
    is_admin: boolean;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

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

export interface SignInBody {
    email: string;
    password: string;
}

export interface ArticleBody {
    title: string;
    article: string;
}

export interface GifBody {
    title: string;
}

export interface CommentBody {
    comment: string;
}
