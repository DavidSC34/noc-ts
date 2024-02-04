import { Server } from "./presentation/server";
//Ventaja  se espera antes de seguir otroso pasos
(async()=>{
main();
})();


function main(){
    Server.start();
}