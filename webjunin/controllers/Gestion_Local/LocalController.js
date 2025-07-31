import { LocalModel } from "../../models/Gestion_Local/LocalModel.js";
import fs from "fs";
import path from "path";

export class LocalController {
  // Obtener todos los locales que no han sido eliminados
  static async getAll(req, res) {
    try {
      const locales = await LocalModel.findAll({
        where: { estadoEliminado: false },
      });
      res.status(200).json(locales);
    } catch (error) {
      console.error("❌ Error al obtener locales:", error);
      res.status(500).json({ message: "Error al obtener los locales" });
    }
  }

  // Crear un nuevo local
  static async create(req, res) {
    try {
      const { nombre, direccion, telefono, id_tipo_local, ubicacion } =
        req.body;

      const imagen = req.file ? `/uploads/${req.file.filename}` : null;

      const nuevoLocal = await LocalModel.create({
        nombre,
        direccion,
        telefono,
        imagen,
        id_tipo_local,
        ubicacion,
        estadoEliminado: false,
      });

      res.status(201).json(nuevoLocal);
    } catch (error) {
      console.error("❌ Error al crear local:", error);
      res.status(500).json({ message: "Error al crear el local" });
    }
  }

  // Actualizar un local existente
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, direccion, telefono, id_tipo_local, ubicacion } =
        req.body;

      const local = await LocalModel.findByPk(id);
      if (!local)
        return res.status(404).json({ message: "Local no encontrado" });

      let nuevaImagen = local.imagen;

      if (req.file) {
        // Eliminar imagen anterior si hay nueva
        if (local.imagen) {
          const rutaAnterior = path.join(
            "uploads",
            path.basename(local.imagen)
          );
          if (fs.existsSync(rutaAnterior)) {
            fs.unlinkSync(rutaAnterior);
          }
        }
        nuevaImagen = `/uploads/${req.file.filename}`;
      }

      await LocalModel.update(
        {
          nombre,
          direccion,
          telefono,
          imagen: nuevaImagen,
          id_tipo_local,
          ubicacion,
        },
        {
          where: { id },
        }
      );

      const actualizado = await LocalModel.findByPk(id);
      res.status(200).json(actualizado);
    } catch (error) {
      console.error("❌ Error al actualizar local:", error);
      res.status(500).json({ message: "Error al actualizar el local" });
    }
  }

  // Eliminar lógicamente un local
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const local = await LocalModel.findByPk(id);
      if (!local)
        return res.status(404).json({ message: "Local no encontrado" });

      await LocalModel.update({ estadoEliminado: true }, { where: { id } });

      res.status(200).json({ message: "Local eliminado correctamente" });
    } catch (error) {
      console.error("❌ Error al eliminar local:", error);
      res.status(500).json({ message: "Error al eliminar el local" });
    }
  }
}
