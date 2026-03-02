import TopUsers from "./TopUsers"
import AirlineAircraft from "./GuessingGame/AirlineAircraft"

export default function MainPage() {
    return (
        <div className="min-h-screen bg-gray-100 pt-10 pb-10 px-4">
            
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                <div className="hidden lg:block lg:col-span-1"></div>

                <div className="lg:col-span-2 flex flex-col items-center">
                    <AirlineAircraft />
                </div>

                <div className="lg:col-span-1 flex justify-center lg:justify-start lg:pt-32">
                    <div className="w-full max-w-sm sticky">
                        <TopUsers />
                    </div>
                </div>
                
            </div>
        </div>
    )
}