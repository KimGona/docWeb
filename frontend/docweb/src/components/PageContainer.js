export default function PageContainer({
    title="",
    children
}) {
    return (
        <div className="px-[30px] py-[30px] w-full h-screen flex flex-col items-start">
            <div className="text-4xl flex flex-row pb-5">
                {title} 
            </div>
            {children}
        </div>
    );
}