const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const PokemonRouter = require("./Pokemon");
const TypeRouter = require("./Types");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter)

router.use("/pokemons", PokemonRouter);
router.use("/types", TypeRouter);

module.exports = router;
