export default function WeekInput({id,label,value,type="text",onValueChange}) {
  return (
    <div
      className={`gap-0 flex p-0 text-left w-[757px] h-[885px]`}
    >
      <div className="relative bg-white flex items-start w-[757px] h-[885px] pt-[34px] pb-[816px] pl-[680px] pr-[42px] rounded-[25px]">

        <p className="absolute font-normal text-black h-12 w-[580.834716796875px] left-[66px] top-[62px] text-[40px]">
          Edit work schedule
        </p>

        <p className="absolute text-2xl font-normal h-[23.3502197265625px] w-[132.39393615722656px] left-[78.11517333984375px] top-[168.8917236328125px] text-[rgba(83,83,83,1)]">
          Day
        </p>

        <div className="absolute flex items-end p-0 w-[507.7696990966797px] h-[425.158935546875px] left-[74.99996948242188px] top-[165px]">
          <div className="flex items-center p-0 text-black font-semibold w-[314.6302795410156px] h-[348.158935546875px] gap-[3.12px]">
            <div className="flex flex-col items-center p-0 w-[190.0242462158203px] h-[313.1336669921875px] gap-[56.87px]">
              <p className="h-[31.1336669921875px] w-[190.0242462158203px] text-[28px]">
                Monday
              </p>
              <p className="h-[31.1336669921875px] w-[190.0242462158203px] text-[28px] mt-[10.5941162109375px]">
                Tuesday
              </p>
              <p className="h-[31.133544921875px] w-[190.0242462158203px] text-[28px] mt-[7.405029296875px]">
                Wednesday
              </p>
              <p className="h-[31.133544921875px] w-[190.0242462158203px] text-[28px]">
                Thursday
              </p>
              <p className="h-[31.133544921875px] w-[190.0242462158203px] text-[28px]">
                Friday
              </p>
            </div>

            <div className="flex flex-col items-start p-0 w-[132.3939666748047px] h-[510.158935546875px] gap-[21.84px]">
              <p className="text-2xl h-[23.3502197265625px] w-[132.39393615722656px]">
                Start time
              </p>
              <input type={type} id={id} value={value} onChange={onValueChange} placeholder={label} className="bg-white border-solid border-2 w-[121.49090576171875px] h-[66.158935546875px] border-[rgba(134,134,134,1)] mt-[31.8084716796875px] rounded-[10px]" required />
              <input type={type} id={id} value={value} onChange={onValueChange} placeholder={label} className="bg-white border-solid border-2 w-[121.49090576171875px] h-[66.158935546875px] border-[rgba(134,134,134,1)] mt-[7.999755859375px] rounded-[10px]" required/>
              <input type={type} id={id} value={value} onChange={onValueChange} placeholder={label} className="bg-white border-solid border-2 w-[121.49090576171875px] h-[66.158935546875px] border-[rgba(134,134,134,1)] mt-[9.99951171875px] rounded-[10px]" required/>
              <input type={type} id={id} value={value} onChange={onValueChange} placeholder={label} className="bg-white border-solid border-2 w-[121.49090576171875px] h-[66.158935546875px] border-[rgba(134,134,134,1)] rounded-[10px]" required/>
              <input type={type} id={id} value={value} onChange={onValueChange} placeholder={label} className="bg-white border-solid border-2 w-[121.49090576171875px] h-[66.158935546875px] border-[rgba(134,134,134,1)] rounded-[10px]" required/>
            </div>

            <div className="flex flex-col items-start p-0 w-[132.3939666748047px] h-[510.158935546875px] gap-[21.84px]">
              <p className="text-2xl h-[23.3502197265625px] w-[132.39393615722656px]">
                End time
              </p>
              <input type={type} id={id} value={value} onChange={onValueChange} placeholder={label} className="bg-white border-solid border-2 w-[121.49090576171875px] h-[66.158935546875px] border-[rgba(134,134,134,1)] mt-[31.8084716796875px] rounded-[10px]" required/>
              <input type={type} id={id} value={value} onChange={onValueChange} placeholder={label} className="bg-white border-solid border-2 w-[121.49090576171875px] h-[66.158935546875px] border-[rgba(134,134,134,1)] mt-[7.999755859375px] rounded-[10px]" required/>
              <input type={type} id={id} value={value} onChange={onValueChange} placeholder={label} className="bg-white border-solid border-2 w-[121.49090576171875px] h-[66.158935546875px] border-[rgba(134,134,134,1)] mt-[9.99951171875px] rounded-[10px]" required/>
              <input type={type} id={id} value={value} onChange={onValueChange} placeholder={label} className="bg-white border-solid border-2 w-[121.49090576171875px] h-[66.158935546875px] border-[rgba(134,134,134,1)] rounded-[10px]" required/>
              <input type={type} id={id} value={value} onChange={onValueChange} placeholder={label} className="bg-white border-solid border-2 w-[121.49090576171875px] h-[66.158935546875px] border-[rgba(134,134,134,1)] rounded-[10px]" required/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


