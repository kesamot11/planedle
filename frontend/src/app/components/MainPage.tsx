import TopUsers from "./TopUsers"
import AirlineAircraft from "./GuessingGame/AirlineAircraft"

export default function MainPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center md:block relative bg-gray-100 pb-10">
            <div className="mb-6 md:mb-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <AirlineAircraft />
            </div>
            <div className="md:absolute md:top-1/2 md:right-10 md:-translate-y-1/2">
                <TopUsers />
            </div>
        </div>
    )
}