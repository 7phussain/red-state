
const HeadingTitle = ({
    icon,
    title,
    additional
}) => {
    return (
        <>
            {additional ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 z-1">
                    <div className="flex items-center gap-4">
                        <div className="text-primary">
                            {icon}
                        </div>
                        <h4 className="text-lg font-semibold">
                            {title}
                        </h4>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        {additional}
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-4 z-1">
                    <div className="text-primary">
                        {icon}
                    </div>
                    <h4 className="text-lg font-semibold">
                        {title}
                    </h4>
                </div>
            )}
        </>
    );
};

export default HeadingTitle;
