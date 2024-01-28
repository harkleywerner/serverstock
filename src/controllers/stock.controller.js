import stock_model from "../models/stock.model.js"

const stock_controller = {

    getAllStock: async (req, res) => {
        try {
            const stock = await stock_model.getAllStocks(req, res)
            res.status(200).json(stock)
        } catch (error) {
            new Error(400)
        }
    },

    getStock: async (req, res) => {
        try {
            const stock = await stock_model.getStock(req)
            res.status(200).json(stock)
            return stock
        } catch (error) {
            new Error(400)
        }

    },

    putStock: async (req, res) => {
        try {
            await stock_model.updateStock(req)
            res.status(200).json({ message: "success" })
        } catch (error) {
            new Error(400)
        }
    },

    postStock: async (req, res) => {
        try {
            await stock_model.addStock(req)
            //Agregar transsaciones.
            res.status(200).json({ message: "success" })
        } catch (error) {
            new Error(400)
        }
    }

}

export default stock_controller