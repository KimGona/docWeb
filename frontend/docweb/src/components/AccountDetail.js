export default function AccountDetail({name,surName,userName,gender,phoneNumber,specialty}) {
    return (
<div className="relative bg-white w-full h-[832px] overflow-hidden text-left text-xl text-black font-lato">
      <b className="absolute top-[107px] left-[62px] text-17xl inline-block w-[398px]">
        Your account details
      </b>

      <div className="absolute top-[196px] left-[62px] text-10xl font-light inline-block w-[122px]">
        Name
      </div>
      <div className="absolute top-[231px] left-[62px] text-10xl inline-block w-[122px]">
        {name}
      </div>
      <div className="absolute top-[298px] left-[62px] text-10xl font-light inline-block w-[122px]">
        Username
      </div>
      <div className="absolute top-[333px] left-[62px] text-10xl inline-block w-[122px]">
        {userName}
      </div>
      <div className="absolute top-[502px] left-[62px] text-10xl font-light inline-block w-[189px]">
        Specialty
      </div>
      <div className="absolute top-[537px] left-[62px] text-10xl inline-block w-[238px]">
        {specialty}
      </div>
      <div className="absolute top-[400px] left-[300px] text-10xl font-light inline-block w-[189px]">
        Phone number
      </div>
      <div className="absolute top-[435px] left-[300px] text-10xl inline-block w-[421px]">
        {phoneNumber}
      </div>
      <div className="absolute top-[196px] left-[300px] text-10xl font-light inline-block w-[122px]">
        Surname
      </div>
      <div className="absolute top-[231px] left-[300px] text-10xl inline-block w-[122px]">
        {surName}
      </div>
      <div className="absolute top-[400px] left-[62px] text-10xl font-light inline-block w-[122px]">
        Gender
      </div>
      <div className="absolute top-[435px] left-[62px] text-10xl inline-block w-[122px]">
        {gender}
      </div>
      </div>
    );
}