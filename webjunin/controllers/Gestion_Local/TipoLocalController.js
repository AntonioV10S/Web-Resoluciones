import { TipoLocalModel } from '../../models/Gestion_Local/TipoLocalModel.js';

export class TipoLocalController {
  // Obtener todos los tipos de local no eliminados
  static async getAll(req, res) {
    try {
      const tipos = await TipoLocalModel.findAll({
        where: { estadoEliminado: false }
      });
      res.status(200).json(tipos);
    } catch (error) {
      console.error('❌ Error al obtener tipos de local:', error);
      res.status(500).json({ message: 'Error al obtener los tipos de local' });
    }
  }

  // Crear un nuevo tipo de local
  static async create(req, res) {
    try {
      const { descripcion } = req.body;

      if (!descripcion) {
        return res.status(400).json({ message: 'La descripción es requerida' });
      }

      const nuevoTipo = await TipoLocalModel.create({
        descripcion,
        estadoEliminado: false
      });

      res.status(201).json(nuevoTipo);
    } catch (error) {
      console.error('❌ Error al crear tipo de local:', error);
      res.status(500).json({ message: 'Error al crear el tipo de local' });
    }
  }

  // Actualizar tipo de local
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { descripcion } = req.body;

      const tipo = await TipoLocalModel.findByPk(id);
      if (!tipo) return res.status(404).json({ message: 'Tipo de local no encontrado' });

      await TipoLocalModel.update({ descripcion }, { where: { id } });

      const actualizado = await TipoLocalModel.findByPk(id);
      res.status(200).json(actualizado);
    } catch (error) {
      console.error('❌ Error al actualizar tipo de local:', error);
      res.status(500).json({ message: 'Error al actualizar el tipo de local' });
    }
  }

  // Eliminar lógicamente un tipo de local
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const tipo = await TipoLocalModel.findByPk(id);
      if (!tipo) return res.status(404).json({ message: 'Tipo de local no encontrado' });

      await TipoLocalModel.update({ estadoEliminado: true }, { where: { id } });

      res.status(200).json({ message: 'Tipo de local eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar tipo de local:', error);
      res.status(500).json({ message: 'Error al eliminar el tipo de local' });
    }
  }
}
