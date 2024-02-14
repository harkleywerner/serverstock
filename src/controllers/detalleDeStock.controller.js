import detalle_de_stock_model from "../models/detalle_de_stock.model.js"

const detalle_de_stock_controller = {

    getUltimoDetalleDeStock: async (req, res, next) => {

        try {
            const ultimoStock = await detalle_de_stock_model.getUltimoDetalleDeStock(req)
            res.status(200).json(ultimoStock)
        } catch (error) {
            next(error)
        }
    },

    getDetalleDeStock: async (req, res, next) => {

        try {
            const stockSeleccionado = await detalle_de_stock_model.getDetallesDeStock(req)
            res.status(200).json(stockSeleccionado)
        } catch (error) {
            next(error)
        }
    }

}

export default detalle_de_stock_controller