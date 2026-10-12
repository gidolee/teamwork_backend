import { Router } from 'express';
import ArticleController from '../controllers/articleController';
import LikesController from '../controllers/likesController';
import ArticleCommentController from '../controllers/articleComment';
import { validateSchema } from '../middleware/validatedata';
import { catchAsync } from '../middleware/catchAsync';
import authenticate from '../middleware/auth';
import {
    createArticleSchema,
    articleCommentSchema,
} from '../validators/articleValidator';

const router = Router();

// POST AN ARTICLE
router.post(
    '/',
    authenticate,
    validateSchema(createArticleSchema),
    catchAsync(ArticleController.createArticle)
);

// UPDATE ARTICLE
router.patch(
    '/:articleId',
    authenticate,
    validateSchema(createArticleSchema),
    catchAsync(ArticleController.updateArticle)
);

// GET ALL ARTICLES
router.get('/', authenticate, catchAsync(ArticleController.getAllArticles));

// GET SINGLE ARTICLE
router.get(
    '/:articleId',
    authenticate,
    catchAsync(ArticleController.getSingleArticle)
);

// GET AN ARTICLE'S COMMENTS
router.get(
    '/:articleId/comments',
    authenticate,
    catchAsync(ArticleCommentController.getArticleComment)
);

// DELETE ARTICLE
router.delete(
    '/:articleId',
    authenticate,
    catchAsync(ArticleController.deleteSingleArticle)
);

// ARTICLE COMMENT
router.post(
    '/:articleId/comment',
    authenticate,
    validateSchema(articleCommentSchema),
    catchAsync(ArticleCommentController.createComment)
);

// LIKE / UNLIKE
router.post(
    '/:articleId/like',
    authenticate,
    catchAsync(LikesController.articleLikes)
);

export default router;
