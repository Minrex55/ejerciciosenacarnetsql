const modelo = require('../modelo/UsuarioModelo');

class UsuarioControlador {
    static async crearUsuario(req, res) {
         const { t1: name, t2: tel, t3: tipdoc, t4: doc, t5: mailsena, t6: mailper, t7: contras, t8: rh, t9: prog, t10: fich, t11: cen} = req.body;
         // Validar campos vacíos❓❓❓❓❓----------------
        const errorCampos = UsuarioControlador.verCampos(name, tel, tipdoc, doc, mailsena, mailper, contras, rh, prog, fich, cen);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }
         // Validar documento❓❓❓❓❓❓-------------------
        const erorIde = UsuarioControlador.verIde(doc);
        if (erorIde) {
            return res.status(400).json({ error: erorIde });
        }
        // Validar nombres completos ❓❓❓❓❓❓❓------------
        const errornom = UsuarioControlador.vernom(name);
        if (errornom) {
            return res.status(400).json({ error: errornom });
        }
        // Validar teléfono❓❓❓❓❓❓❓-----------------------
        const errortel = UsuarioControlador.verTel(tel);
        if (errortel) {
            return res.status(400).json({ error: errortel });
        }
        // Validar correo❓❓❓❓❓❓❓--------------------------
        const errorem = UsuarioControlador.veremail(mailsena);
        if (errorem) {
            return res.status(400).json({ error: errorem });
        }
        // Validar correo❓❓❓❓❓❓❓--------------------------
        const erroremp = UsuarioControlador.veremail(mailper);
        if (errorem) {
            return res.status(400).json({ error: erroremp });
        }
        // Validar contraseña❓❓❓❓❓❓-----------------------
        const errorkey = UsuarioControlador.verkey(contras);
        if (errorkey) {
            return res.status(400).json({ error: errorkey });
        }
         try {
            const result = await modelo.crearUsuarios(name, tel, tipdoc, doc, mailsena, mailper, contras, rh, prog, fich, cen);
            res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
        } catch (err) {
            if (err.message.includes("Duplicate entry")) {
                return res.status(409).json({ error: 'Ya existe un usuario con estos datos.',
                    sugerencia: 'intenta recuperar la cuenta o inicia sesión.' });
              } else {
                return res.status(500).json({ error: 'Error inesperado: ' + err.message });
              }
        }
    }
    static verCampos(name, tel, tipdoc, doc, mailsena, mailper, contras, rh, prog, fich, cen) {
        if (!doc || !name || !tel || !tipdoc || !doc || !mailsena || !mailper || !contras || !rh || !prog || !fich || !cen) {
            return 'Todos los campos son obligatorios.';
        }
        return null; // no encontro campos vacios
    }//cerrar verCampos
     //validar documento
    static verIde(doc) {
        if (!/^\d{8,10}$/.test(doc)) {
            return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
        } else {
            return null; // Todo bien
        }
    }//cerrar documento
    //verificar nombres completos
    static vernom(name) {
        const nom = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        if (!nom.test(name)) {
            return 'Nombres y apellidos invalidos minimo 3 caracteres o maximo 100 solo letras minuscula o ]Mayuscula';
        } else {
            return null;
        }
    }
    //verificar telefono
    static verTel(tel) {
        if (!/^\d{10}$/.test(tel)) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
        } else {
            return null; // todo bien
        }
    }
    //validar correo
    static veremail(mailsena) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!er.test(mailsena) || mailsena.length > 200) {
            return 'Correo inválido. Ejemplo válido: ejemplo@email.com';
        } else {
            return null;
        }
    }//cerrar veremail
    static vermailper(mailper) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!er.test(mailper) || mailper.length > 200) {
            return 'Correo inválido. Ejemplo válido: ejemplo@email.com';
        } else {
            return null;
        }
    }
    //verificar contraseña
    static verkey(contra) {
        const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!key.test(contra)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        } else {
            return null;
        }
    }
}

module.exports = UsuarioControlador