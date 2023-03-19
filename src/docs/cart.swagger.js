/**
 *@swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *  schema:
 *   CartDto:
 *    type: object
 *    properties:
 *     products:
 *      type: array
 *      items:
 *       type: object
 *       properties:
 *        product:
 *         type: string
 *         example: 641435803e7ea1706f3b48cc
 *        quantity:
 *         type: number
 *         example: 1
 */

/**
 * @swagger
 * /cart:
 *   post:
 *    tags:
 *     - Cart
 *    summary: create cart
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schema/CartDto'
 *    responses:
 *     201:
 *      description: creat blogs successful
 *     400:
 *      description: Bad request !!!!!!!!!!
 *   get:
 *    tags:
 *     - Cart
 *    summary: get cart
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: get cart successful
 *     400:
 *      description: Bad request !!!!!!!!!!
 * /cart/order:
 *   post:
 *    tags:
 *     - Cart
 *    summary: example for a order
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: example for a order
 *     400:
 *      description: Bad request !!!!!!!!!!
 * /cart/payment:
 *   post:
 *    tags:
 *     - Cart
 *    summary: example for a payment successfull
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          payment:
 *           type: boolean
 *           example: true
 *    responses:
 *     200:
 *      description: example for a payment successfull
 *     400:
 *      description: Bad request !!!!!!!!!!
 */
