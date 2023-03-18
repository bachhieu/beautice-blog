/**
 *@swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *  schema:
 *   productDto:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     tags:
 *      type: array
 *      items:
 *       type: string
 *       example: hair
 *       enum: [body,hair,skin,healthy]
 *     instock:
 *      type: number
 *      example: 100
 *
 *     price:
 *      type: number
 *      example: 2000000
 */

/**
 * @swagger
 * /product/search:
 *   get:
 *    tags:
 *     - product
 *    summary: get products
 *    parameters:
 *     - in: query
 *       name: name
 *       schema:
 *         type: string
 *    responses:
 *     200:
 *      description: get products successful
 *     400:
 *      description: Internal Server Error
 * /product/top-likes:
 *   get:
 *    tags:
 *     - product
 *    summary: get top products
 *    parameters:
 *     - in: query
 *       name: likes
 *       schema:
 *         type: string
 *         enum: [asc, desc]
 *         default : desc
 *    responses:
 *     200:
 *      description: get products successful
 *     400:
 *      description: Internal Server Error
 * /product/top-views:
 *   get:
 *    tags:
 *     - product
 *    summary: get top products
 *    parameters:
 *     - in: query
 *       name: views
 *       schema:
 *         type: string
 *         enum: [asc, desc]
 *         default : desc
 *    responses:
 *     200:
 *      description: get products successful
 *     400:
 *      description: Internal Server Error
 * /product/top-sold:
 *   get:
 *    tags:
 *     - product
 *    summary: get top products
 *    parameters:
 *     - in: query
 *       name: sold
 *       schema:
 *         type: string
 *         enum: [asc, desc]
 *         default : desc
 *    responses:
 *     200:
 *      description: get products successful
 *     400:
 *      description: Internal Server Error
 * /product/page/{page}:
 *   get:
 *    tags:
 *     - product
 *    summary: get products
 *    parameters:
 *     - name: page
 *       in: path
 *       type: number
 *       repuired: true
 *    responses:
 *     200:
 *      description: get products successful
 *     400:
 *      description: Internal Server Error
 * /product/{id}/like:
 *   post:
 *    tags:
 *     - product
 *    summary : like or unlike a product
 *    parameters:
 *     - name: id
 *       in: path
 *       type: number
 *       repuired: true
 *    responses:
 *     200:
 *      description: get products successful
 *     400:
 *      description: Internal Server Error
 * /product/create:
 *   post:
 *    tags:
 *     - product
 *    summary: Create product successful
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schema/productDto'
 *    responses:
 *     201:
 *      description: Create product successful
 *     400:
 *      description: Internal Server Error
 * /product/{id}:
 *   get:
 *    tags:
 *     - product
 *    summary: get one product
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      description: product detail
 *      repuired: true
 *    responses:
 *     200:
 *      description: register successful
 *     400:
 *      description: Internal Server Error
 *   put:
 *    tags:
 *     - product
 *    summary: Update product successful
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
 *          $ref: '#/components/schema/productDto'
 *    responses:
 *     201:
 *      description: Update product successful
 *     400:
 *      description: Internal Server Error
 *   patch:
 *    tags:
 *     - product
 *    summary: Update product successful
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
 *          $ref: '#/components/schema/productDto'
 *    responses:
 *     201:
 *      description: Update product successful
 *     400:
 *      description: Internal Server Error
 * /product/tags/{tag}:
 *   get:
 *    tags:
 *     - product
 *    summary: get one product
 *    parameters:
 *    - name: tag
 *      in: path
 *      schema:
 *       type: string
 *       enum: [body,hair,skin,healthy]
 *      description: product detail
 *      repuired: true
 *    responses:
 *     200:
 *      description: register successful
 *     400:
 *      description: Internal Server Error
 *
 */
