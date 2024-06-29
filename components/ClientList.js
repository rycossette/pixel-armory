import Line from "./Line";

export default function Client_list() {
  return (

    <div className="flex w-full bg-gradient-to-b from-blue-900 to-indigo-950 h-96">

      <div className="flex flex-wrap w-4/5 mx-auto py-32 items-center p-3 sm:p-10 gap-10">

        <div className="flex flex-col">
          <h1 className="text-4xl text-white font-bold">Clients and IP.</h1>
          {/* <p className="text-xl text-slate-400">It's ok to be impressed.</p> */}
        </div>

        <div className=" opacity-75">
          <div className="flex flex-wrap justify-left max-w-3xl text-slate-500 gap-2">
            <image src="/images/other/clients/apple_small.png" className="h-12 object-contain px-2" alt="Apple" />
            <image src="/images/other/clients/marvel_small.png" className="h-12 object-contain px-2" alt="Marvel" />
            <image src="/images/other/clients/winnebago_small.png" className="h-12 object-contain px-2" alt="Winnebago" />
            <image src="/images/other/clients/dr_scholls_small.png" className="h-12 object-contain px-2" alt="Dr. Scholl's" />
            <image src="/images/other/clients/ea_small.png" className="h-12 object-contain px-2" alt="EA" />
            <image src="/images/other/clients/bestbuy_small.png" className="h-12 object-contain px-2" alt="Best Buy" />
            <image src="/images/other/clients/sony_small.png" className="h-12 object-contain px-2" alt="Sony" />
            <image src="/images/other/clients/foreverence_small.png" className="h-12 object-contain px-2" alt="Foreverence" />
            <image src="/images/other/clients/kelloggs_small.png" className="h-12 object-contain px-2" alt="Kellogg's" />

          </div>
        </div>

      </div>

    </div>



  );
}