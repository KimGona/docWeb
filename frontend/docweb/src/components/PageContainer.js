export default function PageContainer({
    title="",
    children
}) {
    return (
        <div className="px-16 py-10 w-full h-screen flex flex-col items-start">
            <div className="text-4xl font-medium flex flex-row pb-5">
                {title} 
            </div>
            {children}
        </div>
    );
}