/**
 *@swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *  schema:
 *   BlogDto:
 *    type: object
 *    properties:
 *     content:
 *      type: string
 *     tags:
 *      type: array
 *      items:
 *       type: string
 *       example: hair
 */

/**
 * @swagger
 * /blog/search:
 *   get:
 *    tags:
 *     - Blog
 *    summary: get blogs
 *    parameters:
 *     - in: query
 *       name: content
 *       schema:
 *         type: string
 *    responses:
 *     200:
 *      description: get blogs successful
 *     400:
 *      description: Internal Server Error
 * /blog/top-likes:
 *   get:
 *    tags:
 *     - Blog
 *    summary: get top blogs
 *    parameters:
 *     - in: query
 *       name: likes
 *       schema:
 *         type: string
 *         enum: [asc, desc]
 *         default : desc
 *    responses:
 *     200:
 *      description: get blogs successful
 *     400:
 *      description: Internal Server Error
 * /blog/top-views:
 *   get:
 *    tags:
 *     - Blog
 *    summary: get top blogs
 *    parameters:
 *     - in: query
 *       name: views
 *       schema:
 *         type: string
 *         enum: [asc, desc]
 *         default : desc
 *    responses:
 *     200:
 *      description: get blogs successful
 *     400:
 *      description: Internal Server Error
 * /blog/page/{page}:
 *   get:
 *    tags:
 *     - Blog
 *    summary: get blogs
 *    parameters:
 *     - name: page
 *       in: path
 *       type: number
 *       repuired: true
 *    responses:
 *     200:
 *      description: get blogs successful
 *     400:
 *      description: Internal Server Error
 * /blog/{id}/like:
 *   post:
 *    tags:
 *     - Blog
 *    summary : like or unlike a blog
 *    parameters:
 *     - name: id
 *       in: path
 *       type: number
 *       repuired: true
 *    responses:
 *     200:
 *      description: get blogs successful
 *     400:
 *      description: Internal Server Error
 * /blog/create:
 *   post:
 *    tags:
 *     - Blog
 *    summary: Create blog successful
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schema/BlogDto'
 *    responses:
 *     201:
 *      description: Create blog successful
 *     400:
 *      description: Internal Server Error
 * /blog/{id}:
 *   get:
 *    tags:
 *     - Blog
 *    summary: get one blog
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      description: blog detail
 *      repuired: true
 *    responses:
 *     200:
 *      description: register successful
 *     400:
 *      description: Internal Server Error
 *   put:
 *    tags:
 *     - Blog
 *    summary: Update blog successful
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - name: id
 *       in: path
 *       type: number
 *       repuired: true
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schema/BlogDto'
 *    responses:
 *     201:
 *      description: Update blog successful
 *     400:
 *      description: Internal Server Error
 *   patch:
 *    tags:
 *     - Blog
 *    summary: Update blog successful
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - name: id
 *       in: path
 *       type: number
 *       repuired: true
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schema/BlogDto'
 *    responses:
 *     201:
 *      description: Update blog successful
 *     400:
 *      description: Internal Server Error
 * /blog/tags/{tag}:
 *   get:
 *    tags:
 *     - Blog
 *    summary: get one blog
 *    parameters:
 *    - name: tag
 *      in: path
 *      schema:
 *       type: string
 *       enum: [body,hair,skin,healthy]
 *      description: blog detail
 *      repuired: true
 *    responses:
 *     200:
 *      description: register successful
 *     400:
 *      description: Internal Server Error
 *
 */
