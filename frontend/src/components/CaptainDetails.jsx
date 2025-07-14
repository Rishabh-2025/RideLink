import React from 'react'
import { MdAccessTime } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";
import { LuNotebook } from "react-icons/lu";

const CaptainDetails = () => {
    return (
        <div>
            <div className="flex items-center justify-center flex-wrap gap-6">

                <div className='flex   w-screen  justify-between'>

                    <div className="flex items-center  gap-4">
                        <img src="" alt="Captain Avatar" className="h-10 w-10 rounded-full object-cover bg-gray-200" />
                        <h4 className="text-lg font-medium">Captain1</h4>
                    </div>

                    <div className="text-right">
                        <h4 className="text-xl font-semibold text-green-700">&#8377; 193.3</h4>
                        <p className="text-sm text-gray-600">Earned</p>
                    </div>

                </div>


                <div className="flex items-center justify-center  w-full gap-6 p-3 bg-blue-100 rounded-3xl">

                    <div className="text-center">
                        <MdAccessTime className="text-3xl text-gray-700 mx-auto" />
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours Online</p>
                    </div>


                    <div className="text-center">
                        <IoSpeedometerOutline className="text-3xl text-gray-700 mx-auto" />
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Speed Score</p>
                    </div>


                    <div className="text-center">
                        <LuNotebook className="text-3xl text-gray-700 mx-auto" />
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Tasks Logged</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CaptainDetails