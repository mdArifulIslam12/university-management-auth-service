import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";


async function bootstrap():Promise<void> {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('Database is connceted Successfully');
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
          })
          
    } catch (error:any) {
        console.log('Database is not connceted',error.message);
    }
   
  }
  bootstrap();