const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route Get /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

//@desc Create new contacts
//@route Post /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log("the request body is", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are manditory");
  }
  const contact = await Contact.create({ name, email, phone,user_id:req.user.id });
  res.status(201).json({contact});
});

//@desc Create new contacts
//@route Post /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
  res.status(200).json({ contact });
});

//@desc Create new contacts
//@route Post /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString()!==req.user.id){
      res.status(403);
      throw new Error("User don't have permission to update other user contacts")
    }

    const updatedContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.status(200).json(updatedContact);
});

//@desc Delete contacts
//@route Delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString()!==req.user.id){
      res.status(403);
      throw new Error("User don't have permission to update other user contacts")
    }

    await contact.deleteOne({_id:req.params.id});
  res.status(200).json(contact);
});


module.exports = {
  getContact,
  createContact,
  getContacts,
  deleteContact,
  updateContact,
};

// const asyncHandler = require("express-async-handler");
// const Contact = require("../models/contactModel");

// // Get all contacts
// const getContacts = asyncHandler(async (req, res) => {
//   const contacts = await Contact.find({ user_id: req.user.id });
//   res.status(200).json({ contacts });
// });

// // Create a new contact
// const createContact = asyncHandler(async (req, res) => {
//   const { name, email, phone } = req.body;
//   if (!name || !email) {
//     return res.status(400).json({ error: "Name and email are mandatory" });
//   }
//   const contact = await Contact.create({ name, email, phone });
//   res.status(201).json({ contact });
// });

// // Get a single contact by ID
// const getContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     return res.status(404).json({ error: 'Contact not found' });
//   }
//   res.status(200).json({ contact });
// });

// // Update a contact by ID
// const updateContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     return res.status(404).json({ error: 'Contact not found' });
//   }
//   const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.status(200).json({ updatedContact });
// });

// // Delete a contact by ID
// const deleteContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     return res.status(404).json({ error: 'Contact not found' });
//   }
//   await contact.deleteOne();
//   res.status(200).json({ contact });
// });

// module.exports = {
//   getContact,
//   createContact,
//   getContacts,
//   deleteContact,
//   updateContact,
// };
