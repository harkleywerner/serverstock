import detalle_de_stock_model from "../models/detalle_de_stock.model.js"

const detalle_de_stock_controller = {


    getDetalleDeStock: async (req, res, next) => {

        try {
            const stockSeleccionado = await detalle_de_stock_model.getDetallesDeStock(req)
            res.status(200).json(stockSeleccionado)
        } catch (error) {
            next(error)
        }
    },

    postDetalleDeStock: async (req, res, next) => {
        try {
            const stockSeleccionado = await detalle_de_stock_model.getDetalleDeStockByIdStock(req)
            res.status(200).json(stockSeleccionado)
        } catch (error) {
            next(error)
        }
    }


}

export default detalle_de_stock_controller