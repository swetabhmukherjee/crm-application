const { logger} = require('../logger');

const getTableData = (req, res, db) => {
  logger.info('enter getTableData function');
  db.select('*').from('customer')
    .then(items => {
      if(items.length){
        res.json(items)
        logger.info('exit getTableData function');
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTableData = (req, res, db) => {
  logger.info('enter postTableData function');
  const { cust_name, cust_email, cust_phn, cust_address, cust_gst, rem_freq } = req.body
  // const added = new Date()
  db('customer').insert({ cust_name, cust_email, cust_phn, cust_address, cust_gst, rem_freq})
    .returning('*')
    .then(item => {
      res.json(item)
      logger.info('exit postTableData function');
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
  logger.info('enter putTableData function');
  const { cust_id, cust_name, cust_email, cust_phn, cust_address, cust_gst, rem_freq } = req.body
  db('customer').where({cust_id}).update({cust_name, cust_email, cust_phn, cust_address, cust_gst, rem_freq})
    .returning('*')
    .then(item => {
      res.json(item)
      logger.info('exit putTableData function');

    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
  logger.info('enter deleteTableData function');
  const { cust_id } = req.body
  db('customer').where({cust_id}).del()
    .then(() => {
      res.json({delete: 'true'})
      logger.info('exit deleteTableData function');
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const addConvo = (req, res, db) => {
  logger.info('enter addConvo function');
  const { cust_id, cust_convo} = req.body
  db('customer').insert({ cust_id, cust_convo})
    .returning('*')
    .then(item => {
      res.json(item)
      logger.info('exit addConvo function');
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  addConvo

}