const mongoose=require('mongoose')

try{

    exports.dbConn=async ()=>{
        await mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log("Database Connected")
    }
}catch(err){
    console.log(`Database Connection error: ${err.message}`)
}
