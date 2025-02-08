import express from 'express';

import Food from '../models/food.js';

const router = express.Router();


/**
 * @swagger
 * /api/v1/foods:
 *   get:
 *     summary: Retrieve all foods
 *     responses:
 *       200:
 *         description: A list of foods
 */

router.get('/', async (req, res) => {

    let foods = await Food.find();

    if (!foods) {
        return res.status(204).json({ err: 'No Results' });
    }

    return res.status(200).json(foods);
});

/**
 * @swagger
 * /api/v1/foods/{id}:
 *   get:
 *     summary: Find food by its id
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *           required: true
 *     responses:
 *       200:
 *         description: Returns a single food
 *       404:
 *         description: Not found
 */
router.get('/:id', async (req, res) => {
    let food = await Food.findById(req.params.id);

    if (!food) {
        return res.status(404).json({ msg: 'Not Found' });
    }

    return res.status(200).json(food);
});

/**
 * @swagger
 * /api/v1/foods:
 *   post:
 *     summary: add new food from POST body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resource created
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
    try {
        await Food.create(req.body);
        return res.status(201).json();  
    }
    catch (err) {
        return res.status(400).json({ err: `Bad Request: ${err}` });
    }
});

/**
 * @swagger
 * /api/v1/foods/{id}:
 *   put:
 *     summary: update selected food from request body
 *     parameters:
 *       -name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       204:
 *         description: Resource updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.put('/:id', async (req, res) => {
    try {
        let food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ msg: 'Not Found' });
        }

        if (req.params.id != req.body._id) {
            return res.status(400).json({ msg: 'Bad Request: _ids do not match' });
        }

        await Food.findByIdAndUpdate(req.params.id, req.body);
        return res.status(204).json(); // 204: resource modified
    }
    catch (err) {
        return res.status(400).json({ err: `Bad Request: ${err}` });
    }
});


/**
 * @swagger
 * /api/v1/foods/{id}:
 *   delete:
 *     summary: Remove selected food
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *           required: true
 *     responses:
 *       204:
 *         description: Resource updated (removed)
 *       404:
 *         description: Not found
 */

router.delete('/:id', async (req, res) => {
    let food = await Food.findById(req.params.id);

    if (!food) {
        return res.status(404).json({ msg: 'Not Found' });
    }

   await Food.findByIdAndDelete(req.params.id);
    return res.status(204).json();
});


export default router;