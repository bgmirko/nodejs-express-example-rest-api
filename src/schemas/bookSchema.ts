/**
 * @openapi
 * components:
 *  schemas:
 *    CreateBookInput:
 *      type: object
 *      required:
 *        - userUid
 *        - title
 *        - publisher
 *        - genre
 *        - numberOfPages
 *      properties:
 *        userUid:
 *          type: string
 *          default: 956b086d-f22d-43a3-8966-77d412555cc6
 *        title:
 *          type: string
 *          default: Book title
 *        publisher:
 *          type: string
 *          default: Laguna
 *        description:
 *          type: string
 *          default: Book description
 *        genre:
 *          type: string
 *          default: Classic
 *        numberOfPages:
 *          type: number
 *          default: 320
 *    UpdateBookInput:
 *      type: object
 *      properties:
 *        userUid:
 *          type: string
 *          default: 956b086d-f22d-43a3-8966-77d412555cc6
 *        title:
 *          type: string
 *          default: Book title
 *        publisher:
 *          type: string
 *          default: Laguna
 *        description:
 *          type: string
 *          default: Book description
 *        genre:
 *          type: string
 *          default: Classic
 *        numberOfPages:
 *          type: number
 *          default: 320
 */
