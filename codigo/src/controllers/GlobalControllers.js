/**
 * CONTROLADORES GLOBALES
 * Instancias compartidas de controladores para mantener el estado entre componentes
 */
import StaffController from './StaffController.js';
import ComprobanteController from './ComprobanteController.js';

// Instancia única de StaffController para compartir datos del staff
const staffController = new StaffController();

// Instancia única de ComprobanteController vinculada al StaffController
const comprobanteController = new ComprobanteController(staffController);

export { staffController, comprobanteController };
