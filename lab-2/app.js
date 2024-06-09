const mongoose = require('mongoose');

const ProgrammingLanguage  = require('./models');

const uri = 'mongodb+srv://tmathai2579:JpIXMdfLgcokY3Gi@cluster0.7ci384x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connecting to MongoDB using the URI and performing CRUD Operations
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await performCRUDOperations();
    mongoose.connection.close(); // Close the connection after all operations
  })
  .catch(err => {
    console.error('Error:', err);
  });

// To create a new programming language data
const createProgrammingLanguage = async (name, author, yearOfRelease, latestVersion, website) => {
  const programmingLanguage = new ProgrammingLanguage({ name, author, yearOfRelease, latestVersion, website});
  await programmingLanguage.save();
  console.log(`Programming Language ${name} created successfully.`);
};

// To read a new programming language data
const readProgrammingLanguages = async () => {
  const programmingLanguages = await ProgrammingLanguage.find();
  console.log(`(${programmingLanguages.length}) Programming Languages found:`, programmingLanguages);
};

// To update a new programming language data
const updateProgrammingLanguage = async (id, newVersion) => {
  const updatedProgrammingLanguage = await ProgrammingLanguage.findByIdAndUpdate(id, { latestVersion: newVersion }, { new: true });
  console.log('The programming language has been updated successfully:', updatedProgrammingLanguage);
};

// To delete a new programming language data
const deleteProgrammingLanguage = async (id) => {
  const deletedProgrammingLanguage = await ProgrammingLanguage.findByIdAndDelete(id);
  console.log('The programming language has been deleted successfully:', deletedProgrammingLanguage);
};

// Sequential CRUD Operations
const performCRUDOperations = async () => {
  await createProgrammingLanguage('Python', 'Guido van Rossum', 1991, '3.10.0', 'https://www.python.org');
  await createProgrammingLanguage('JavaScript', 'Brendan Eich', 1995, 'ES2021', 'https://www.javascript.com');
  await createProgrammingLanguage('Android', 'Google', 2008, '11.0', 'https://developer.android.com');
  
  // Reads all data from DB
  await readProgrammingLanguages();

  // To find and update
  const selectedProgrammingLanguageToUpdate = await ProgrammingLanguage.findOne({ name: 'JavaScript' });
  selectedProgrammingLanguageToUpdate ? await updateProgrammingLanguage(selectedProgrammingLanguageToUpdate._id, 'ES2022') : errorMessage("update");

  // To find and delete
  const selectedProgrammingLanguageToDelete = await ProgrammingLanguage.findOne({ name: 'Android' });
  selectedProgrammingLanguageToDelete ? await deleteProgrammingLanguage(selectedProgrammingLanguageToDelete._id) : errorMessage("deletion");

  // To read the updated DB
  await readProgrammingLanguages();
};

// Error message function
function errorMessage(action) {
  console.log(`Programming Language not found for ${action}`);
}
// performCRUDOperations();