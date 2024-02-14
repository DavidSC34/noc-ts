import { envs } from './config/plugins/envs.plugins';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from "./presentation/server";
//Ventaja  se espera antes de seguir otroso pasos
(async()=>{
main();
})();


async function main(){

    await MongoDatabase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    })

    //Crear una conleccion = tabla, documento = registro
    // const newLog = await LogModel.create({
    //     message:'Test message from Mongo',
    //     origin:'App.ts',
    //     level:'low'
    // });

    // await newLog.save();
    // console.log(newLog);

    const logs = await LogModel.find();
    console.log(logs);
    // Server.start();

    // console.log(envs.PORT);
}