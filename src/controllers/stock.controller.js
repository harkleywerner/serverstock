import detalle_de_stock_model from "../models/detalle_de_stock.model.js"
import stock_model from "../models/stock.model.js"


const stock_controller = {

    getAllStock: async (req, res) => {

        const stock = await stock_model.getAllStocks(req, res)
        res.status(200).json(stock)

    },

    getDetalleStock: async (req, res) => {
        const detalleStock = await detalle_de_stock_model.getDetallesDeStock(req, res)
        res.status(200).json(detalleStock)
    },


    getStock: async (req, res) => {

        const stock = await stock_model.getStock(req)
        res.status(200).json(stock)
    },

    putStock: async (req, res, next) => {
        await detalle_de_stock_model.updateDetalleDeStock(req, res, next)
        await stock_model.updateStock(req, res, next)
        res.status(200).json({ message: "success" })

    },

    postStock: async (req, res, next) => {
        const insertID = await stock_model.addStock(req, next)
        const newReq = {...req.body = {},insertID}
        await detalle_de_stock_model.addDetalleDeStock(newReq, next)
        res.status(200).json({ message: "success" })

    }
}

export default stock_controller