import cors from "cors"

const corsConfigMiddleware = () => {
    return cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
}

export default corsConfigMiddleware