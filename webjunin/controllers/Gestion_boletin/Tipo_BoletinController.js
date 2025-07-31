import { createRequire } from "node:module";
import { Tipo_BoletinModel } from "../../models/Gestion_boletin/Tipo_boletinModel.js";
const require = createRequire(import.meta.url);

export class TipoBoletinController {
  static async getAll(request, res) {
    try {
      const TipoBoletin = await Tipo_BoletinModel.findAll({
        where: { estadoEliminado: false },
        
      });
      return res.status(200).json({ TipoBoletin });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async create(request, res) {
    try {
      const { descripcion } = request.body;

      const TipoBoletin = await Tipo_BoletinModel.create({
        descripcion,
        estadoEliminado: false, // ✔️ Valor requerido por el modelo
      });

      res.status(201).json(TipoBoletin);
    } catch (error) {
      console.log("❌ Error al crear tipo de boletín:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async search(request, res) {
    try {
      const { id } = request.params;
      const TipoBoletin = await Tipo_BoletinModel.findAll({
        where: { id: id, estadoEliminado: false },
      });
      return res.status(200).json(TipoBoletin);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req, res) {
    try {
      const { id, descripcion, estadoEliminado } = req.body;

      const tipo = await Tipo_BoletinModel.update(
        { descripcion, estadoEliminado }, // ❌ no incluyas `id`
        { where: { id } }
      );

      res.status(200).json(tipo);
    } catch (error) {
      console.error("❌ Error al actualizar tipo de boletín:", error);
      res.status(500).json({ message: "Error interno al actualizar" });
    }
  }

  static async delete(request, res) {
    try {
      const { id } = request.params;
      const TipoBoletin = await Tipo_BoletinModel.update(
        { estadoEliminado: true },
        { where: { id: id } }
      );
      if (!TipoBoletin) {
        return res.status(404).json({ message: "Registro no encontrado" });
      }
      res.status(200).json({ message: "Registro eliminado correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
