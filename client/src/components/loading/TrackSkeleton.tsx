import Skeleton from "react-loading-skeleton";

const TrackSkeleton = () => {
	return (
		<div className="flex gap-2 p-2">
			<Skeleton circle width={40} height={40} />
			<div className="w-full">
				<Skeleton borderRadius={10} />
				<Skeleton width={150} borderRadius={10} />
			</div>
		</div>
	);
};

export default TrackSkeleton;
