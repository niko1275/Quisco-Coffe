import Image from "next/image";
import {Cake, Coffee, Donut, Hamburger} from 'lucide-react'
export const Explore = () => {
  return (
    <>
      <section className="py-12 xl:py-0 xl:h-[60vh] xl:w-screen bg-orange-50">
        <div className="container mx-auto xl:w-full xl:h-full flex xl:justify-center">
          <div className=" w-full flex flex-col 
          lg:flex-row gap-12 xl:gap-20 
          ">
            <div className="flex-1 flex flex-col 
            text-center  xl:gap-0 max-w-[400px] mx-auto
            xl:max-w-none xl:mx-0  justify-around 
            ">
              <div className="">
                <div className="flex mb-4 mt-2  justify-center">
                  <Donut className="w-12 h-12 text-orange-300" />
                </div>
                <h3 className="font-playwright text-black font-bold ">
                  Explora Nuestras Donas
                </h3>
                <p className="text-gray-400">
              Suaves, glaseadas y siempre frescas. 
              Nuestras donas son el complemento dulce ideal para tu café o simplemente para alegrarte el día.
                </p>
               </div>
                <div className="">
                  <div className="flex mb-4 mt-2  justify-center">
                    <Coffee className="w-12 h-12 text-orange-300" />
                  </div>
                  <h3 className="font-playwright text-black font-bold">
                    Explora Nuestros Cafés
                  </h3>
                  <p className="text-gray-400">
                   Aromático, intenso y preparado con dedicación. 
                   Nuestro café realza el sabor de cada dona, pastel o hamburguesa. ¡Un clásico infaltable!
                  </p>
                </div>
              </div>
            <div className=" hidden xl:flex justify-center">
              <div className="relative w-[500px] h-[500px] 
              ">  
              <Image
                src="/coffecup.png"
                alt="Cup"
                fill
                quality={100}
                className="object-cover rounded-lg"
                priority
              />
                 </div>
              
            </div>
           <div className="flex-1 flex flex-col  items-center
            text-center xl:text-left gap-12 xl:gap-0 max-w-[400px] mx-auto
            xl:max-w-none xl:mx-0 justify-around 
            ">
               <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex mb-4 mt-2  justify-center">
                    <Cake className="w-12 h-12 text-orange-300" />
                  </div>
                  <h3 className="font-playwright text-black font-bold">
                    Explora Nuestros Pasteles
                  </h3>
                 <p className="text-gray-400">
                  Hechos con ingredientes de calidad y mucho cariño.
                   Nuestros pasteles son perfectos para compartir, celebrar o simplemente disfrutar sin motivo.


                  </p>
               </div>
                 <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex mb-4 mt-2  justify-center">
                      <Hamburger className="w-12 h-12 text-orange-300" />
                    </div>
                    <h3 className="font-playwright text-black font-bold">
                      Hamburguesas
                    </h3>
                   <p className="text-gray-400">
                     Jugosas, caseras y llenas de sabor.
                      Nuestras hamburguesas combinan increíble con un café fuerte o una dona dulce de postre. ¿Ya las probaste?
                    </p>
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Explore;
