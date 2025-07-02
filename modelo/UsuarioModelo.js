const dbService = require('./bd/Conexion');
const bcrypt = require('bcrypt');

class UsuarioModelo {
    // funcion para crear nuevos clientes
  static async crearUsuarios(name, tel, tipdoc, doc, mailsena, mailper, contras, rh, prog, fich) {
    const query = 'INSERT INTO usuarios (nombres, telefono, tipodoc, documento, correosena, correopersonal, contrasena, rh, programa, ficha, fechacreacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
      // Generar el hash de la contraseña con bcrypt
      const salto = 10; // Nivel de seguridad de encriptación
      const contra = await bcrypt.hash(contras, salto);

      return await dbService.query(query, [name, tel, tipdoc, doc, mailsena, mailper, contra, rh, prog, fich, new Date()]);
    } catch (err) {
      throw new Error(`Error al crear su nueva cuenta: ${err.message}`);
    }
  }//cerrar crear cliente
}

module.exports = UsuarioModelo;