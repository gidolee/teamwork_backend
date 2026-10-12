import { z } from 'zod';

export const createArticleSchema = z.object({
    body: z.object({
        title: z
            .string()
            .min(3, { message: 'Title must be at least 3 characters' })
            .max(50, { message: 'Title cannot exceed 50 characters' }),
        article: z
            .string()
            .min(1, { message: 'Article body is required' })
            .max(2500, { message: 'Article cannot exceed 2500 characters' }),
        category_id: z.coerce.number().int().positive().optional(),
        color_id: z.coerce.number().int().positive().optional(),
    }),
});

export const articleCommentSchema = z.object({
    body: z.object({
        comment: z
            .string()
            .min(1, { message: 'Comment cannot be empty' })
            .max(180, { message: 'Comment cannot exceed 180 characters' }),
    }),
});

export const flagArticleSchema = z.object({
    body: z.object({
        flagged: z.boolean({ message: 'flagged is required' }),
    }),
});

export type CreateArticleType = z.infer<typeof createArticleSchema>;
export type ArticleCommentType = z.infer<typeof articleCommentSchema>;
export type FlagArticleType = z.infer<typeof flagArticleSchema>;
