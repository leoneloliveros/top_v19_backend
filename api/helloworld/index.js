const { Router } = require('express');

const router = Router();

/**
 * @openapi
 * /api/helloworld:
 *  get:
 *    tags:
 *    - HealthCheck
 *    description: Get es para probar que nuestro servidor esta up
 *    responses:
 *      200:
 *        description: App is running
 *      400:
 *        description: Bad request
 *      402:
 *        description: Authentication failed
 *
 */

router.get('/', (req, res) => {
  res.send('Hello World! Leonel is happy ');
});

module.exports = router;
