const pool = require('../database/db');
const { parse } = require('wkt');

const getLands = async (req, res, next) => {
    await pool.query("SELECT id, name, city, ST_AsText(geom) as geom FROM land")
        .then((response) => {
            const lands = response.rows.map(object => {
                return { ...object, geom: parse(object.geom) };
            });
            res.json({
                status: "SUCCESS",
                data: lands
            });
        })
        .catch((error) => next(error));
};

const createLand = async (req, res, next) => {
    const { name, city, geom } = req.body;
    await pool.query('INSERT INTO land (name, city, geom) VALUES ($1, $2, $3) RETURNING *', [name, city, geom])
        .then((response) =>
            res.json({
                status: "SUCCESS",
                data: response.rows[0]
            }))
        .catch((error) => next(error));
};

const deleteLand = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM land WHERE id = $1 RETURNING *', [id])
        .then(response => {
            if (response.rowCount === 0) {
                throw new Error('Ese campo no existe');
            }
            return res.json({
                status: 'SUCCESS',
                message: 'Campo eliminado correctamente',
                data: response.rows[0]
            });
        })
        .catch(error => next(error));
};

module.exports = {
    getLands,
    createLand,
    deleteLand
};