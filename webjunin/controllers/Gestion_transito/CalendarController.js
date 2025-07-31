import { createRequire } from 'node:module';
import { CalendarModel } from '../../models/Gestion_transito/CalendarModel.js';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);

export class CalendarController {

  static async getAll(request, res) {
    try {
      const CalendarTran = await CalendarModel.findAll({
        where: { estadoEliminado: false }
      });
      return res.status(200).json({ CalendarTran });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }


  static async create(request, res) {
    try {
      console.log('📥 req.body:', request.body);
      console.log('🖼️ req.file:', request.file);

      const { mes } = request.body;
      const estadoEliminado = false;
      const imagen = request.file?.filename;

      if (!mes || !imagen) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
      }

      const input = {
        mes,
        imagen: `/uploads/${imagen}`,
        fechaRegistro: new Date(),
        estadoEliminado
      };

      const CalendarTran = await CalendarModel.create(input);
      res.status(201).json(CalendarTran);

    } catch (error) {
      console.error('Error al crear calendarización:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  static async search(request, res) {
    try {
      const { id } = request.params;
      const CalendarTran = await CalendarModel.findAll({
        where: { id, estadoEliminado: false }
      });
      return res.status(200).json(CalendarTran);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }


  static async update(request, res) {
    try {
      const { id } = request.params;

      // Validar existencia
      const existe = await CalendarModel.findByPk(id);
      if (!existe) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }

      const { mes } = request.body;
      const nombreArchivo = request.file?.filename;


      if (nombreArchivo && existe.imagen) {
        // Si en DB se guardó con `/uploads/nombre`, quitar ese prefijo:
        const nombreImagenAnterior = path.basename(existe.imagen);
        const rutaAnterior = path.join('uploads', nombreImagenAnterior);
        if (fs.existsSync(rutaAnterior)) {
          fs.unlinkSync(rutaAnterior);
          console.log('✅ Imagen anterior eliminada:', rutaAnterior);
        }
      }


      const actualizacion = { mes };
      if (nombreArchivo) {
        actualizacion.imagen = `/uploads/${nombreArchivo}`;
      }

      await CalendarModel.update(actualizacion, { where: { id } });
      const actualizado = await CalendarModel.findByPk(id);

      res.status(200).json({
        message: 'Registro actualizado correctamente',
        data: actualizado,
      });

    } catch (error) {
      console.error('🔥 Error en update:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  static async delete(request, res) {
    try {
      const { id } = request.params;
      const CalendarTran = await CalendarModel.update(
        { estadoEliminado: true },
        { where: { id } }
      );

      if (!CalendarTran) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }

      res.status(200).json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
