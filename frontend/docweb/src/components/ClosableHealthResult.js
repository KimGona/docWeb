function getTitle(isForPatient) {
  if (isForPatient) return "Doctor"
  else return "Patient"
}

export default function ClosableHealthResult({num,date, name,bloodSugar, bloodPressure,heartRate,description, isForPatient=true}) {
    return (
     <div className="relative w-[871px] h-[443px] text-left text-xl text-black font-lato">
     <div className="absolute top-[0px] left-[0px] rounded-md bg-white box-border w-[871px] h-[443px] border-[3px] border-solid border-greenPrimary" />
           <div className="absolute top-[0px] left-[0px] rounded-md bg-greenPrimary w-[871px] h-[68px]" />
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
                       {getTitle(isForPatient)}
                     </div>
                   </div>
                   <div className="absolute top-[24px] left-[0px] text-10xl inline-block w-52">
                     {name}
                   </div>
            </div>
            <div className="absolute top-[179px] left-[31px] w-52 h-[53px]">
                    <div className="absolute top-[0px] left-[0px] w-[103px] h-6">
                      <div className="absolute top-[0px] left-[0px] font-light">
                        Blood sugar
                      </div>
                    </div>
                    <div className="absolute top-[24px] left-[0px] text-10xl inline-block w-52">
                      {bloodSugar}
                    </div>
                  </div>
           <div className="absolute top-[345px] left-[31px] w-52 h-[53px]">


             <div className="absolute top-[0px] left-[0px] w-[88px] h-6">
               <div className="absolute top-[0px] left-[0px] font-light">
                 Heart rate
               </div>
             </div>
             <div className="absolute top-[24px] left-[0px] text-10xl inline-block w-52">
               {heartRate}
             </div>
           </div>

                <div className="absolute top-[262px] left-[31px] w-52 h-[53px]">
             <div className="absolute top-[0px] left-[0px] w-[129px] h-6">
               <div className="absolute top-[0px] left-[0px] font-light">
                 Blood pressure
               </div>
             </div>
             <div className="absolute top-[24px] left-[0px] text-10xl inline-block w-52">
               {bloodPressure}71
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