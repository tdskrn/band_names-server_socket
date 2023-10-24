const { io } = require('../index')
const Band = require('../models/band')
const Bands = require('../models/bands')
const bands = new Bands()
bands.addBand(new Band('Queen'))
bands.addBand(new Band('Bon Jovi'))
bands.addBand(new Band('Heroes del silencio'))
bands.addBand(new Band('Metallica'))
bands.addBand(new Band('MC Pipoquinha'))
bands.addBand(new Band('MC Poze do Rodo'))

console.log(bands)

// Mensagens de Sockets
io.on('connection', client => {
  console.log('Cliente conectado')
  client.emit('active-bands', bands.getBands())
  client.on('disconnect', () => {
    console.log('Cliente desconectado')
  })

  // client.on('message', payload => {
  //   console.log('Message', payload)
  //   io.emit('message', { admin: 'Nova Message' })
  // })
  // client.on('new-message', payload => {
  //   console.log('Message', payload)
  //   client.broadcast.emit('new-message', payload)
  // })

  // client.on('flutter-message', payload => {
  //   console.log(payload)
  // })

  client.on('vote-band', payload => {
    bands.voteBand(payload.id)
    io.emit('active-bands', bands.getBands())
  })

  client.on('delete-band', payload => {
    bands.deleteBand(payload.id)
    io.emit('active-bands', bands.getBands())
  })

  client.on('add-band', payload => {
    bands.addBand(new Band(payload.name))
    io.emit('active-bands', bands.getBands())
  })
})
