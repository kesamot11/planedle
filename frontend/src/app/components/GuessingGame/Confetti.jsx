export default function Confetti() {
	return (
		<div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
			{Array.from({ length: 50 }).map((_, i) => ( // Show 50 confettis
				<div
					key={i}
					className="confetti-piece"
					style={{
						left: `${Math.random() * 100}%`, // Random horizontal position
						backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
						animationDelay: `${Math.random()}s`,
						transform: `rotate(${Math.random() * 360}deg)`
					}}
				/>
			))}
		</div>
	);
}
