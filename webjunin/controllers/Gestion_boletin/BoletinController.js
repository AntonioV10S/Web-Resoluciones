import { createRequire } from "node:module";
import { Tipo_BoletinModel } from "../../models/Gestion_boletin/Tipo_boletinModel.js";
import { BoletinModel } from "../../models/Gestion_boletin/BoletinModel.js";
import fs from "fs";
import path from "path";

const require = createRequire(import.meta.url);

export class BoletinController {
  static async getAll(request, res) {
    try {
      const Boletines = await BoletinModel.findAll({
        where: { estadoEliminado: false },
        include: [
          {
            model: Tipo_BoletinModel,
            attributes: ["descripcion"],
          },
        ],
      });
      return res.status(200).json({ Boletines });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async create(request, res) {
    try {
      console.log("🖼️ req.file:", request.file);

      const { fechamax_mostrar, id_tipo_boletin, mensaje } = request.body;
      const estadoEliminado = false;
      const imagen = request.file?.filename;

      // Validación de campos obligatorios
      if (!fechamax_mostrar || !id_tipo_boletin || !mensaje || !imagen) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios." });
      }

      const nuevoBoletin = {
        fechamax_mostrar: new Date(fechamax_mostrar),
        id_tipo_boletin: parseInt(id_tipo_boletin),
        mensaje,
        imagen: `/uploads/${imagen}`,
        fechaRegistro: new Date(), // 🕒 Generado aquí, no viene del frontend
        estadoEliminado,
      };

      const creado = await BoletinModel.create(nuevoBoletin);
      res.status(201).json(creado);
    } catch (error) {
      console.error("❌ Error al crear boletín:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async search(request, res) {
    try {
      const { id } = request.params;
      const Boletines = await BoletinModel.findAll({
        where: { id: id, estadoEliminado: false },
      });
      return res.status(200).json(Boletines);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(request, res) {
    try {
      const { id } = request.params;

      const existe = await BoletinModel.findByPk(id);
      if (!existe) {
        return res.status(404).json({ message: "Boletín no encontrado" });
      }

      let { fechamax_mostrar, id_tipo_boletin, mensaje } = request.body;
      const nombreArchivoNuevo = request.file?.filename;

      // ✅ Convertir fecha string a objeto Date
      if (fechamax_mostrar) {
        fechamax_mostrar = new Date(fechamax_mostrar);
      }

      // ✅ Eliminar imagen anterior si se subió nueva
      if (nombreArchivoNuevo && existe.imagen) {
        const nombreImagenAnterior = path.basename(existe.imagen);
        const rutaAnterior = path.join("uploads", nombreImagenAnterior);
        if (fs.existsSync(rutaAnterior)) {
          fs.unlinkSync(rutaAnterior);
          console.log("✅ Imagen anterior eliminada:", rutaAnterior);
        }
      }

      // ✅ Preparar objeto con campos válidos
      const actualizacion = {
        fechamax_mostrar,
        id_tipo_boletin,
        mensaje,
      };

      if (nombreArchivoNuevo) {
        actualizacion.imagen = `/uploads/${nombreArchivoNuevo}`;
      }

      await BoletinModel.update(actualizacion, { where: { id } });

      const actualizado = await BoletinModel.findByPk(id);
      res.status(200).json(actualizado); // Retorna solo el boletín
    } catch (error) {
      console.error("🔥 Error en update de boletín:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async delete(request, res) {
    try {
      const { id } = request.params;
      const Boletines = await BoletinModel.update(
        { estadoEliminado: true },
        { where: { id: id } }
      );
      if (!Boletines) {
        return res.status(404).json({ message: "Registro no encontrado" });
      }
      res.status(200).json({ message: "Registro eliminado correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
