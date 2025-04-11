
const HeadingTitle = ({
    icon,
    title
}) => {
    return (
        <div className="flex items-center gap-4">
            <div className="text-primary">
                {icon}
            </div>
            <h4 className="text-xl font-semibold">
                {title}
            </h4>
        </div>
    );
};

export default HeadingTitle;
