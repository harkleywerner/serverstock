import stock_model from "../models/stock.model.js"


const stock_controller = {

    getAllStock: async (req, res, next) => {
        try {
            const stock = await stock_model.getAllStocks(req, res)
            res.status(200).json({ tipo: "success", data: stock })
        } catch (error) {
            next(error)
        }
    },

    getStockGestion: async (req, res, next) => {
        try {
            const stock = await stock_model.getUltimoStock(req)
            res.status(200).json({ data: stock[0], tipo: "success" })
        } catch (error) {
            next(error)
        }
    },

    patchStockGestion: async (req, res, next) => {

        try {
            const data = await stock_model.updateStock(req, next)
            res.status(200).json({ tipo: "success", data })
        } catch (error) {
            next(error)
        }

    },

    postStock: async (req, res, next) => {
        try {
            const results = await stock_model.getStockByIdProducto(req)
            res.status(200).json({tipo : "success",data : results})
        } catch (error) {
            next(error)
        }
    },

    postNuevoStock: async (req, res, next) => {

        try {
            const response = await stock_model.addStock(req, next)
            res.status(200).json({ message: "success", ...response })

        } catch (error) {
            next(error)
        }

    }
}

export default stock_controller