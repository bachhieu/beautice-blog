/**
 *@swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *  schema:
 *   UserRegister:
 *    type: object
 *    properties:
 *     name:
 *      defaul: null
 *      type: string
 *     avatar:
 *      type: string
 *     email:
 *      type: string
 *      format: email
 *     password:
 *      type: string
 *    required:
 *     - email
 *     - password
 *   Userlogin:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      format: email
 *      example: admin@gmail.com
 *     password:
 *      type: string
 *      example: 123456789
 *    required:
 *     - email
 *     - password
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *    tags:
 *     - User
 *    summary: register user
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: get user successful
 *     400:
 *      description: Bad request!
 * /user/register:
 *   post:
 *    tags:
 *     - User
 *    summary: register user
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schema/UserRegister'
 *    responses:
 *     201:
 *      description: register successful
 *     500:
 *      description: Internal Server Error
 *
 * /user/login:
 *   post:
 *    tags:
 *     - User
 *    summary: login user
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schema/Userlogin'
 *    responses:
 *     200:
 *      description: login user successful
 *     500:
 *      description: Internal Server Error
 * /user/refresh-token:
 *   post:
 *    tags:
 *     - User
 *    summary: refresh token
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          properties:
 *           refreshToken:
 *            type: string
 *    responses:
 *     200:
 *      description: refresh token successful
 *     500:
 *      description: Internal Server Error
 *
 */
