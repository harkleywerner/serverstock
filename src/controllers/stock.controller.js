import stock_model from "../models/stock.model.js"


const stock_controller = {

    getAllStock: async (req, res, next) => {
        try {
            const stock = await stock_model.getAllStocks(req, res)
            res.status(200).json(stock)
        } catch (error) {
            next(error)
        }
    },

    getStock: async (req, res, next) => {
        try {
            const stock = await stock_model.getStock(req)
            const detalleStock = await detalle_de_stock_model.getDetallesDeStock(req, res)
            res.status(200).json({ stock, detalleStock })
        } catch (error) {
            next(error)
        }
    },

    putStock: async (req, res, next) => {

        try {
            await stock_model.updateStock(req, next)
            res.status(200).json({ message: "success" })
        } catch (error) {
            next(error)
        }

    },

    postStock: async (req, res, next) => {

        try {
            const response = await stock_model.addStock(req)
            res.status(200).json({ message: "success", ...response })

        } catch (error) {
            next(error)
        }

    }
}

export default stock_controller