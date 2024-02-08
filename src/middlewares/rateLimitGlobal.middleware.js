import rateLimit from "express-rate-limit"

const rateLimitGloalMiddleware = (limitCount = 8555) => {

   return rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: limitCount,
      message: async (req) => {
         const { resetTime } = req.rateLimit
         const nowDate = Date.now()
         const nextDate = new Date(resetTime).getTime()
         const differenceInMinutes = Math.round((nextDate - nowDate) / (1000 * 60));
         
         return {
            message: `Has excedido el límite de solicitudes. Intenta nuevamente en ${differenceInMinutes} min.`,
            code: 429,
            tipo: "BackEndError",
         }
      },
      statusCode: 429,
      standardHeaders: true,
      legacyHeaders: false,
   })
}

export default rateLimitGloalMiddleware