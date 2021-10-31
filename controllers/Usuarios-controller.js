const mysql = require('../config/db').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.postCadastro = (req, res, next) => {

    const user = {
        USERNAME: req.body.nome,
        PASSWORD: req.body.senha,
        EMAIL: req.body.email,
        FIRST_NAME: req.body.first_name,
        LAST_NAME: req.body.last_name,
        ESPECIALIDADE: req.body.especialidade,
        DT_NASC: req.body.dt_nasc
    };

    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM Users WHERE EMAIL = ?', [user.EMAIL], (error, results) => {
            if (error) { return res.status(500).send({ error: error }) };
            if (results.length > 0) {
                res.status(409).send({ mensagem: 'Usuário já cadastrado' })
            } else {
                bcrypt.hash(user.PASSWORD, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error_crypt: errBcrypt }) }
                    conn.query(
                        'INSERT INTO Users(USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL, SUBS_TYPE, DT_NASC)VALUES(?,?,?,?,?,?,?)',
                        [user.USERNAME, hash, user.FIRST_NAME, user.LAST_NAME, user.EMAIL, user.ESPECIALIDADE, user.DT_NASC],
                        (error, resultado, field) => {
                            conn.release();

                            if (error) { return res.status(500).send({ error: error, response: null }) };

                            response = {
                                mensagem: "Usuário cadastrado com sucesso!",
                                usuario_criado: {
                                    id_user: resultado.insertId,
                                    UsuarioCadastrado: {
                                        USERNAME: req.body.nome,
                                        PASSWORD: hash,
                                        EMAIL: req.body.email,
                                        FIRST_NAME: req.body.first_name,
                                        LAST_NAME: req.body.last_name,
                                        ESPECIALIDADE: req.body.especialidade,
                                        DT_NASC: req.body.dt_nasc
                                    }
                                }
                            }

                            return res.status(201).send(response);
                        }
                    );

                });
            }
        });
    });

};

exports.getUser = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Users WHERE ID_USERS = ?',
            req.usuario.id_user,
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(200).send({
                    mensagem: "Dados do usuário",
                    user: result[0]
                });
            }
        );
    });
}

exports.getUsuarios = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Users',
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(200).send({
                    mensagem: "Dados do usuário",
                    user: result
                });
            }
        );
    });
}


exports.postLogin = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = 'SELECT * FROM Users WHERE EMAIL = ?';
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            bcrypt.compare(req.body.senha, results[0].PASSWORD, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação' });
                }
                if (result) {
                    const token = jwt.sign({
                        id_user: results[0].ID_USERS,
                        email: results[0].EMAIL
                    }, 'MyQuestionsKey', {
                        expiresIn: "5h"
                    });
                    return res.status(200).send({
                        mensagem: 'Autenticado com sucesso',
                        token: token,
                        user: {
                            id_user: results[0].ID_USERS,
                            username: results[0].USERNAME,
                            first_name: results[0].FIRST_NAME,
                            last_name: results[0].LAST_NAME,
                            email: results[0].EMAIL,
                        }


                    });
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' });
            });
        });
    });
};


exports.updateReseteSenha = (req, res, next) => {
    
    mysql.getConnection((err, conn) => {
        bcrypt.hash('BTV2021', 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error_crypt: errBcrypt }) }
            conn.query(
                'UPDATE users SET PASSWORD = ? WHERE ID_USERS = ?',
                [hash, req.params.id_user],
                (error, resultado, field) => {
                    conn.release();

                    if (error) { return res.status(500).send({ error: error, response: null }) };

                    response = {
                        mensagem: "Senha resetada com sucesso!",
                        senhaNova: "Nova senha - BTV2021"
                    }

                    return res.status(201).send(response);
                }
            );

        });
    });
};


exports.postCadastroPaciente = (req, res, next) => {
    const paciente = {
        NOME_RESPONSAVEL: req.body.NOME_RESPONSAVEL,
        DT_NASC_RESPONSAVEL: req.body.DT_NASC_RESPONSAVEL,
        RG_RESPONSAVEL: req.body.RG_RESPONSAVEL,
        CPF_RESPONSAVEL: req.body.CPF_RESPONSAVEL,
        TEL_RESPONSAVEL: req.body.TEL_RESPONSAVEL,
        EMAIL_RESPONSAVEL: req.body.EMAIL_RESPONSAVEL,
        LOGRADOURO: req.body.LOGRADOURO,
        BAIRRO: req.body.BAIRRO,
        NOME_PACIENTE: req.body.NOME_PACIENTE,
        DT_NASC_PACIENTE: req.body.DT_NASC_PACIENTE,
        RG_PACIENTE: req.body.RG_PACIENTE,
        CPF_PACIENTE: req.body.CPF_PACIENTE,
        TEL_PACIENTE: req.body.TEL_PACIENTE,
        EMAIL_PACIENTE: req.body.EMAIL_PACIENTE,
    };
    mysql.getConnection((error, conn) => {
        conn.query(
            `INSERT INTO Pacientes(
                NOME_RESPONSAVEL,
                DT_NASC_RESPONSAVEL,
                RG_RESPONSAVEL,
                CPF_RESPONSAVEL,
                TEL_RESPONSAVEL,
                EMAIL_RESPONSAVEL,
                LOGRADOURO,
                BAIRRO,
                NOME_PACIENTE,
                DT_NASC_PACIENTE,
                RG_PACIENTE,
                CPF_PACIENTE,
                TEL_PACIENTE,
                EMAIL_PACIENTE
                )VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [paciente.NOME_RESPONSAVEL, paciente.DT_NASC_RESPONSAVEL, paciente.RG_RESPONSAVEL, paciente.CPF_RESPONSAVEL, paciente.TEL_RESPONSAVEL, paciente.EMAIL_RESPONSAVEL, paciente.LOGRADOURO, paciente.BAIRRO, paciente.NOME_PACIENTE, paciente.DT_NASC_PACIENTE, paciente.RG_PACIENTE, paciente.CPF_PACIENTE, paciente.TEL_PACIENTE, paciente.EMAIL_PACIENTE],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                        mensagem: "Falha ao cadastrar paciente!"
                    });
                };

                res.status(201).send({
                    mensagem: "Paciente cadastrado com sucesso!",
                    id_paciente: resultado.insertId,
                    Paciente_Cadastrado: paciente
                });
            }
        );
    });

}



exports.getPacientes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM pacientes;',
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(200).send({
                    mensagem: "Dados do usuário",
                    Query_result: result
                });
            }
        );
    });
}
