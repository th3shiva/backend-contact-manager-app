const express=require('express');
const router=express.Router()

const {getContact, createContact, getContacts, deleteContact, updateContact}=require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

// const getContact = require('../controllers/contactController');
// const createContact = require('../controllers/contactController')
// const deleteContact = require('../controllers/contactController')
// const getContacts = require('../controllers/contactController')
// const updateContact = require('../controllers/contactController')


router.use(validateToken);
router.route('/').get(getContacts).post(createContact);
// router.route('/').post(createContact);

  router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

  // router.route('/:id').put(updateContact);
  // router.route('/:id').delete(deleteContact);

  module.exports=router;