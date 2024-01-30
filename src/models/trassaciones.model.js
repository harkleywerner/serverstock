import startConnection from "../config/database.js"

const trassaciones_model = {

    addTranssacion : async (req,next ) => {
        
        let connection;
        
       try {
      
       } catch (error) {
        
       }
       finally {
        if(connection) await connection.release()
       }
    }

}


export default trassaciones_model