export default function ClosableHealthResult({num,date, patientName,bloodSugar, bloodPressure,heartRate,description}) {
    return (
     <div className="relative w-[871px] h-[443px] text-left text-xl text-black font-lato">
     <div className="absolute top-[0px] left-[0px] rounded-3xs bg-white box-border w-[871px] h-[443px] border-[3px] border-solid border-darkseagreen-100" />
           <div className="absolute top-[0px] left-[0px] rounded-3xs bg-darkseagreen-100 w-[871px] h-[68px]" />
                <b className="absolute top-[18px] left-[28.4px] text-10xl inline-block text-white w-[279.96px]">
                  Health result {num}
                </b>
                <div className="absolute top-[21px] left-[228px] text-lg text-white inline-block w-[335.42px]">
                  <span>{`added on `}</span>
                  <span className="font-semibold">{date}</span>
                </div>
            <div className="absolute top-[96px] left-[31px] w-52 h-[53px]">
            <div className="absolute top-[0px] left-[0px] w-[61px] h-6">
                     <div className="absolute top-[0px] left-[0px] font-light">
                       Patient
                     </div>
                   </div>
                   <div className="absolute top-[24px] left-[0px] text-10xl inline-block w-[600px]">
                     {patientName}
                   </div>
            </div>
            <div className="absolute top-[179px] left-[31px] w-52 h-[53px]">
                    <div className="absolute top-[0px] left-[0px] w-[103px] h-6">
                      <div className="absolute top-[0px] left-[0px] w-52">
                        Blood sugar
                      </div>
                    </div>
                    <div className="absolute top-[24px] left-[0px] text-10xl inline-block w-[600px]">
                      {bloodSugar}
                    </div>
                  </div>
           <div className="absolute top-[345px] left-[31px] w-52 h-[53px]">


             <div className="absolute top-[0px] left-[0px] w-[88px] h-6">
               <div className="absolute top-[0px] left-[0px] w-52">
                 Heart rate
               </div>
             </div>
             <div className="absolute top-[24px] left-[0px] text-10xl inline-block w-52">
               {heartRate}
             </div>
           </div>

                <div className="absolute top-[262px] left-[31px] w-52 h-[53px]">
             <div className="absolute top-[0px] left-[0px] w-[129px] h-6">
               <div className="absolute top-[0px] left-[0px] w-52">
                 Blood pressure
               </div>
             </div>
             <div className="absolute top-[24px] left-[0px] text-10xl inline-block w-52">
               {bloodPressure}
             </div>
           </div>
           <div className="absolute top-[96px] left-[220px] w-[480px] h-[299px]">
                   <div className="absolute top-[0px] left-[0px] w-[163px] h-6">
                     <div className="absolute top-[0px] left-[0px] font-light">
                       Overall description
                     </div>
                   </div>
                   <div className="absolute top-[24px] left-[0px] text-10xl inline-block w-[502px] h-[275px]">
                     {description}
                      </div>
                 </div>

     </div>

    );
}