const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const visitasRoutes = require('./routes/visitasRoutes');
const paisRoutes = require('./routes/PaisRoutes'); // 
const ciudadRoutes = require('./routes/ciudadRoutes');
const sitioRoutes = require('./routes/sitioRoutes');
const platoTipicoRoutes = require('./routes/platoTipicoRoutes');
const famosoRoutes = require('./routes/personFamosaRoutes');

const app = express(); 

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/visitas', visitasRoutes);
app.use('/api/paises', paisRoutes); 
app.use('/api/ciudades', ciudadRoutes);
app.use('/api/sitios', sitioRoutes);
app.use('/api/platos', platoTipicoRoutes);
app.use('/api/famosos', famosoRoutes);

module.exports = app;


