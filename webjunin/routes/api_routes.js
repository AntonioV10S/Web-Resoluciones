import {Router} from 'express';
import {NoticiaController} from "../controllers/Gestion_noticias/NoticiaController.js"
import {CategoriaController} from '../controllers/Gestion_noticias/Categoriacontroller.js';
import {NumeralController} from '../controllers/Gestion_LOTAIP/NumeralController.js';
import {TipoArchivoController} from '../controllers/Gestion_LOTAIP/TipoarchivoController.js';
import {LotaipController} from '../controllers/Gestion_LOTAIP/LotaipController.js';
import {year_mesController} from '../controllers/Gestion_mes_year/year_mesController.js'
import {YearController} from '../controllers/Gestion_mes_year/YearController.js'
import {Categoria_OrdenazaController} from '../controllers/Gestion_ordenanzas/Categoria_OrdenanzaController.js';
import {OrdenanzaController} from '../controllers/Gestion_ordenanzas/OrdenanzaController.js';
import {TipoResolucionController} from '../controllers/Gestion_resoluciones/Tipo_resolucionController.js';
import {ResolucionController} from '../controllers/Gestion_resoluciones/ResolucionController.js';
import {CalendarController} from '../controllers/Gestion_transito/CalendarController.js';
import {TipoBoletinController} from '../controllers/Gestion_boletin/Tipo_BoletinController.js';
import { BoletinController } from '../controllers/Gestion_boletin/BoletinController.js';
import { middwAuth } from '../middleware/authenticate.js';


export const ApiRouter = Router();

//NOTICIAS
ApiRouter.get('/noticia',NoticiaController.getAll);
ApiRouter.post('/noticia', NoticiaController.create);
ApiRouter.get('/noticia/:id', NoticiaController.search);
ApiRouter.patch('/noticia/:id', NoticiaController.update);
ApiRouter.delete('/noticia/:id', NoticiaController.delete);

//CATEGORIA_NOTICIAS
ApiRouter.get('/categoria', CategoriaController.getAll);
ApiRouter.post('/categoria',CategoriaController.create);
ApiRouter.get('/categoria/:id', CategoriaController.search);
ApiRouter.patch('/categoria/:id', CategoriaController.update);
ApiRouter.delete('/categoria/:id', CategoriaController.delete);

//GESTION LOTAIP
//------ numeral
ApiRouter.get('/numeral_lotaip', NumeralController.getAll);
ApiRouter.post('/numeral_lotaip', NumeralController.create);
ApiRouter.get('/numeral_lotaip/:id', NumeralController.search);
ApiRouter.patch('/numeral_lotaip/:id', NumeralController.update);
ApiRouter.delete('/numeral_lotaip/:id', NumeralController.delete);
//------ tipo de archivo 
ApiRouter.get('/tipo_archivo', TipoArchivoController.getAll);
ApiRouter.post('/tipo_archivo', TipoArchivoController.create);
ApiRouter.get('tipo_archivo/:id', TipoArchivoController.search);
ApiRouter.patch('/tipo_archivo/:id', TipoArchivoController.update);
ApiRouter.delete('/tipo_archivo/:id', TipoArchivoController.delete);
//------ lotaip
ApiRouter.get('/lotaip', LotaipController.getAll);
ApiRouter.post('/lotaip', LotaipController.create);
ApiRouter.get('/lotaip/:id', LotaipController.search);
ApiRouter.patch('/lotaip/:id', LotaipController.update);
ApiRouter.delete('/lotaip/:id', LotaipController.delete);

//MES Y AÑO
ApiRouter.get('/mes_year', year_mesController.getAll);
ApiRouter.post('/mes_year', year_mesController.create);
ApiRouter.get('/mes_year/:id', year_mesController.search);
ApiRouter.patch('/mes_year/:id', year_mesController.update);
// ApiRouter.delete('/mes_year:id', year_mesController.delete);

//Year
ApiRouter.get('/year', YearController.getAll);
ApiRouter.post('/year', YearController.create);
ApiRouter.get('/year/:id', YearController.search);
ApiRouter.patch('/year/:id', YearController.update);

// ORDENANZAS
//---------Categoria ordenanzas
ApiRouter.get('/categoria_ordenanza', Categoria_OrdenazaController.getAll);
ApiRouter.post('/categoria_ordenanza', Categoria_OrdenazaController.create);
ApiRouter.get('/categoria_ordenanza/:id', Categoria_OrdenazaController.search);
ApiRouter.patch('/categoria_ordenanza/:id', Categoria_OrdenazaController.update);
ApiRouter.delete('/categoria_ordenanza/:id', Categoria_OrdenazaController.delete);

//Ordenanzas
ApiRouter.get('/ordenanza', OrdenanzaController.getAll);
ApiRouter.post('/ordenanza', OrdenanzaController.create);
ApiRouter.get('/ordenanza/:id', OrdenanzaController.search);
ApiRouter.patch('/ordenanza/:id', OrdenanzaController.update);
ApiRouter.delete('/ordenanza/:id', OrdenanzaController.delete);

//RESOLUCIONES
//---------Tipo resolucion
ApiRouter.get('/tipo_resolucion', TipoResolucionController.getAll);
ApiRouter.post('/tipo_resolucion', TipoResolucionController.create);
ApiRouter.get('/tipo_resolucion/:id', TipoResolucionController.search);
ApiRouter.patch('/tipo_resolucion/:id', TipoResolucionController.update);
ApiRouter.delete('/tipo_resolucion/:id', TipoResolucionController.delete);

//RESOLUCIONES
ApiRouter.get('/resolucion', ResolucionController.getAll);
ApiRouter.post('/resolucion', ResolucionController.create);
ApiRouter.get('/resolucion/:id', ResolucionController.search);
ApiRouter.patch('/resolucion/:id', ResolucionController.update);
ApiRouter.delete('/resolucion/:id', ResolucionController.delete);

//Calendarizacion de transito
ApiRouter.get('/calendarizacion', CalendarController.getAll);
ApiRouter.post('/calendarizacion', CalendarController.create);
ApiRouter.get('/calendarizacion/:id', CalendarController.search);
ApiRouter.patch('/calendarizacion/:id', CalendarController.update);
ApiRouter.delete('/calendarizacion/:id', CalendarController.delete);

//Gestion boletines
//-------tipo boletin
ApiRouter.get('/tipo_boletin', TipoBoletinController.getAll);
ApiRouter.post('/tipo_boletin', TipoBoletinController.create);
ApiRouter.get('/tipo_boletin/:id', TipoBoletinController.search);
ApiRouter.patch('/tipo_boletin/:id', TipoBoletinController.update);
ApiRouter.delete('/tipo_boletin/:id', TipoBoletinController.delete);

//--------- boletines
ApiRouter.get('/boletin', BoletinController.getAll);
ApiRouter.post('/boletin', BoletinController.create);
ApiRouter.get('/boletin/:id', BoletinController.search);
ApiRouter.patch('/boletin/:id', BoletinController.update);
ApiRouter.delete('/boletin/:id', BoletinController.delete);
