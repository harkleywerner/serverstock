import detalle_de_stock_model from "../models/detalle_de_stock.model.js"
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
            await detalle_de_stock_model.updateDetalleDeStock(req, next)
            await stock_model.updateStock(req, next)
            res.status(200).json({ message: "success" })
        } catch (error) {
            next(error)
        }

    },

    postStock: async (req, res, next) => {

        try {
            const insertID = await stock_model.addStock(req, next)
            const newReq = { ...req.body = {}, insertID }
            await detalle_de_stock_model.addDetalleDeStock(newReq, next)
            res.status(200).json({ message: "success" })
        } catch (error) {
            next(error)
        }

    }
}

export default stock_controller