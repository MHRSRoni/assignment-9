//dependencies
const Book = require("../models/bookModel"); 

//getallbooks => all books
exports.getallbooks = async (req, res) => {
    try {
    const book = await Book.find();     //book finding query
    res.status(200).json(book);
        
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error"});    //http error
        console.log(err);
    }
}

//getbookbyid => single book
exports.getbookbyid = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);    //database qurery
    if(!book){
        res.status(404).json({ error: "Requested book not found"});     //if not found
    }else{
        res.json(book);     //if found
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error"});    //if failed to query
    console.log(err);
  }
}

//createbook => single book
exports.createbook = async (req, res) => {
    try {
     const {Title, Author, Description = "", PublishedYear = new Date().getFullYear()} = req.body;  //destructring all needed data with some default value
     console.log(PublishedYear)

     if(!Title.trim()){
        return res.json({ msg: "Please input the valid data"})    //if title not given
     }; 
     if(!Author.trim()){
        return res.json({ msg : "Please input the valid data"})   //if author not given
     }

    //check if book name is already there
    const existingbookTitle = await Book.findOne({Title});  //database query
    if(existingbookTitle) {
        return res.json({ Error: "Book already exists"});   //if book exits res error
    }

    //Create a new book
    const book = await new Book({   //create the book
        Title,
        Author,
        Description,
        PublishedYear
    }).save();  //save in database
    
    res.json({book})    //Send Response 
        

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error"});    //http error response
        console.log(err);
    }
}

//updatebook => single book
exports.updatebook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});    //database query to update the book
        if(!book){
            return res.status(404).json({ error: 'Book not found' });   //if that book not exists
        }else{
            res.json({ book})   //send the updated book
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error"});    //if any error happen in database query
        console.log(err);
    }
}

//deletebook => single book
exports.deletebook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);   //database query to delete the book
        if(!book){
            return res.status(404).json({ error: "Book not found"});    //if book not exists
        }else{
            res.status(200).json({ book});  //send the book if deleted
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error"});    //if database query failed
        console.log(err);
    }
}
