/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - username
 *        - password
 *        - role
 *        - email
 *      properties:
 *        firstName:  
 *          type: string
 *          default: Milica
 *        lastName:  
 *          type: string
 *          default: Jovanovic
 *        username:  
 *          type: string
 *          default: milica24
 *        password:  
 *          type: string
 *          default: test123
 *        role:  
 *          type: string
 *          default: Admin 
 *        email:
 *          type: string
 *          default: milica.jo@example.com
 *        active:
 *          type: boolean
 *          default: true
 *    UpdateUserInput:
 *      type: object
 *      properties:
 *        firstName:  
 *          type: string
 *          default: Milica
 *        lastName:  
 *          type: string
 *          default: Jovanovic
 *        username:  
 *          type: string
 *          default: milica24
 *        password:  
 *          type: string
 *          default: test123
 *        role:  
 *          type: string
 *          default: Admin 
 *        email:
 *          type: string
 *          default: milica.jo@example.com
 *        active:
 *          type: boolean
 *          default: true
 *    LoginUserInput:
 *      type: object
 *      properties:
 *        username:  
 *          type: string
 *          default: petar80
 *        password:  
 *          type: string
 *          default: test123
 *    RefreshTokenInput:
 *      type: object
 *      properties:
 *        refreshToken:  
 *          type: string
 *          default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTU2YjA4NmQtZjIyZC00M2EzLTg5NjYtNzdkNDEyNTU1YzNlIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY4MDcyNTgwLCJleHAiOjE2NzA2NjQ1ODB9.SvjLLf7EW3xQdQcltjxa3u645YhrKVi_FczCazcl4kI
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        username:
 *          type: string
 *        role:
 *          type: string  
 *        email:
 *          type: string
 *        active:
 *          type: boolean
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    LoginResponse:
 *      type: object
 *      properties:
 *        success: 
 *          type: boolean
 *          default: true
 *        token:
 *          type: string
 *          default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTU2YjA4NmQtZjIyZC00M2EzLTg5NjYtNzdkNDEyNTU1YzNlIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY4MDcyNTgwLCJleHAiOjE2NzA2NjQ1ODB9.SvjLLf7EW3xQdQcltjxa3u645YhrKVi_FczCazcl4kI
 *        refreshToken:
 *          type: string
 *          default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTU2YjA4NmQtZjIyZC00M2EzLTg5NjYtNzdkNDEyNTU1YzNlIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY4MDcyNTgwLCJleHAiOjE2NzA2NjQ1ODB9.SvjLLf7EW3xQdQcltjxa3u645YhrKVi_FczCazcl4kI
 *        message:
 *          type: string
 *          default: User login successfully
 */