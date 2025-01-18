import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    
    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-white bg-blue-600 border border-transparent rounded-xl transition-all hover:bg-teal-500 hover:border-teal-500 focus:outline-none"
            >
                Buy Now
            </Button>
            
            <Dialog
                open={open}
                handler={handleOpen}
                className="fixed inset-0 flex items-center justify-center p-6 bg-teal-50 z-50"
            >
                <DialogBody className="space-y-4 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={addressInfo.name}
                            onChange={(e) => setAddressInfo({ ...addressInfo, name: e.target.value })}
                            placeholder="Enter your name"
                            className="bg-white border border-teal-200 px-4 py-3 w-full rounded-md outline-none text-teal-700 placeholder-teal-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            value={addressInfo.address}
                            onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
                            placeholder="Enter your address"
                            className="bg-white border border-teal-200 px-4 py-3 w-full rounded-md outline-none text-teal-700 placeholder-teal-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="pincode"
                            value={addressInfo.pincode}
                            onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
                            placeholder="Enter your pincode"
                            className="bg-white border border-teal-200 px-4 py-3 w-full rounded-md outline-none text-teal-700 placeholder-teal-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="mobileNumber"
                            value={addressInfo.mobileNumber}
                            onChange={(e) => setAddressInfo({ ...addressInfo, mobileNumber: e.target.value })}
                            placeholder="Enter your mobile number"
                            className="bg-white border border-teal-200 px-4 py-3 w-full rounded-md outline-none text-teal-700 placeholder-teal-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                        />
                    </div>

                    <div className="mt-4">
                        <Button
                            type="button"
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                            }}
                            className="w-full px-4 py-3 text-center text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none transition-all"
                        >
                            Confirm Purchase
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;
