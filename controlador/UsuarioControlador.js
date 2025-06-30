const modelo = require('../modelo/UsuarioModelo');

class UsuarioControlador {
    static async crearUsuario(req, res) {
        const {
            t1: name,
            t2: tel,
            t3: tipdoc,
            t4: doc,
            t5: mailsena,
            t6: mailper,
            t7: contras,
            t8: rh,
            t9: prog,
            t10: fich,
            t11: cen
        } = req.body;

        // Validar campos vacíos
        const errorCampos = UsuarioControlador.verCampos(name, tel, tipdoc, doc, mailsena, mailper, contras, rh, prog, fich, cen);
        if (errorCampos) return res.status(400).json({ error: errorCampos });

        // Validaciones individuales
        const validaciones = [
            UsuarioControlador.vernom(name),
            UsuarioControlador.verTel(tel),
            UsuarioControlador.vertip(tipdoc),
            UsuarioControlador.verIde(doc),
            UsuarioControlador.veremail(mailsena),
            UsuarioControlador.vermailper(mailper),
            UsuarioControlador.verkey(contras),
            UsuarioControlador.verfich(fich),
            UsuarioControlador.vertiprh(rh), // RH validación
        ];

        const error = validaciones.find(e => e !== null);
        if (error) return res.status(400).json({ error });

        try {
            const result = await modelo.crearUsuarios(name, tel, tipdoc, doc, mailsena, mailper, contras, rh, prog, fich, cen);
            res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
        } catch (err) {
            if (err.message.includes("Duplicate entry")) {
                return res.status(409).json({
                    error: 'Ya existe un usuario con estos datos.',
                    sugerencia: 'Intenta recuperar la cuenta o inicia sesión.'
                });
            } else {
                return res.status(500).json({ error: 'Error inesperado: ' + err.message });
            }
        }
    }

    static verCampos(name, tel, tipdoc, doc, mailsena, mailper, contras, rh, prog, fich, cen) {
        if (!name || !tel || !tipdoc || !doc || !mailsena || !mailper || !contras || !rh || !prog || !fich || !cen) {
            return 'Todos los campos son obligatorios.';
        }
        return null;
    }

    static verIde(doc) {
        return /^\d{8,10}$/.test(doc) ? null : 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
    }

    static vertip(tipdoc) {
        const tiposValidos = ['CC', 'TI', 'PT'];
        return tiposValidos.includes(tipdoc.trim().toUpperCase())
            ? null
            : 'Tipo de documento inválido. Usa: CC, TI o PT.';
    }

    static vernom(name) {
        const nom = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        return nom.test(name)
            ? null
            : 'Nombres y apellidos inválidos. Usa solo letras, mínimo 3 caracteres, máximo 100.';
    }

    static verTel(tel) {
        return /^\d{10}$/.test(tel)
            ? null
            : 'El teléfono debe tener exactamente 10 dígitos.';
    }

    static veremail(correo) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return er.test(correo) && correo.length <= 200
            ? null
            : 'Correo SENA inválido. Ejemplo: ejemplo@email.com';
    }

    static vermailper(correo) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return er.test(correo) && correo.length <= 200
            ? null
            : 'Correo personal inválido. Ejemplo: ejemplo@email.com';
    }

    static verkey(contra) {
        const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return key.test(contra)
            ? null
            : 'La contraseña debe tener al menos 8 caracteres, con mayúscula, minúscula, número y símbolo.';
    }

    static vertiprh(rh) {
        const rhvalido = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        return rhvalido.includes(rh.trim().toUpperCase())
            ? null
            : 'RH inválido. Usa: A+, A-, B+, B-, AB+, AB-, O+, O-.';
    }

    static verfich(fich) {
        return /^\d{7,10}$/.test(fich) ? null : 'La ficha debe tener entre 7 y 10 dígitos numéricos.';
    }
}

module.exports = UsuarioControlador;
