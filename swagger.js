import swaggerJsdoc from "swagger-jsdoc"

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Node Express MongoDB REST API",
            version:"1.0.0",
            description:"This is a RESTful API built with Node.js, Express, and MongoDB"
        },
        servers:[
            {
                url:"http://localhost:3000"
            },
            {
                url:"https://elon-backend-1111.onrender.com"
            }
        ],
        components:{
            securitySchemes:{
                BearerAuth:{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat:"JWT",
                    description:"Enter JWT token"
                }
            }
        }
    },
    apis:["./route/*.js"]
}
 
const swaggerdocs=swaggerJsdoc(options)
export default swaggerdocs