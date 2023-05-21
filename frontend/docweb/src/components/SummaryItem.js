import Button from "../components/Button";

function SumButton({isButtonVisible, onClick}) {
    if (isButtonVisible)
        return <Button color="pink outline" label="Change" onClick={onClick} />;
}

export default function SummaryItem({topText, middleText, bottomText, isButtonVisible=true, onClick}) {
    return (
      <div className="w-full pt-4">
          
          <div className="w-full grid grid-cols-2 justify-items-start pt-4">
              <div className="flex flex-col">
                  <p className="text-xl font-normal pb-6">{topText}</p>
                  <h3 className="text-3xl font-medium pb-2">{middleText}</h3>
                  <p className="text-xl font-normal text-zinc-700">{bottomText}</p>
                  <div className="py-2"></div>
              </div>
              <div className="justify-self-end">
                  <SumButton isButtonVisible={isButtonVisible} onClick={onClick} />
              </div>
          </div>
          
          <hr class="w-full bg-zinc-400 border-0 dark:bg-gray-700 pt-[1px]" />
      </div>
    );
  }