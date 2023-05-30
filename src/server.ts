import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import colors from 'colors'


async function bootstrap():Promise<void> {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('Database is connceted Successfully'.green.bold);
        app.listen(config.port, () => {
            console.log(colors.green(`Example app listening on port ${config.port}`).bold)
          })
          
    } catch (err:any) {
        console.log(colors.red('Database is not connceted'),err.red);
    }
   
  }
  bootstrap();