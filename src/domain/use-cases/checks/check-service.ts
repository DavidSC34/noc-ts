interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = ()=>void;
type ErrorCallback = (error:string)=> void;


//este metodo no es estatico, por que se requiere una inyeccion para implementarlo
export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly successCalback :SuccessCallback,
        private readonly erroCallback: ErrorCallback
    ){}

   public async execute(url: string): Promise<boolean> {
       try {
        const req = await fetch(url);

        if(!req.ok){
            throw new Error(`Error on check service ${url}`);
        }
        this.successCalback();
        // console.log(`${url} is ok`);
        return true;
       
    } catch (error) {
          
         console.log(`${error}`);

         this.erroCallback(`${error}`);
         return false;
    }

   }

    
}