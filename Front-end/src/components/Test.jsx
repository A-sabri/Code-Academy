const Test = () => {
    return (

        <div className="relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64">
            <div
                className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0">
                <div className="flex w-full mx-auto text-left">
                    <div className="relative inline-flex items-center mx-auto align-middle">
                        <div className="text-center">
                            <h1 className="max-w-5xl text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-6xl lg:max-w-7xl">
                                Welcome to Code Academy
                            </h1>
                            <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">
                                Code Academy is an online coding school dedicated to providing high-quality education in software development. Our mission is to empower individuals by teaching them the skills needed to thrive in the tech industry. <br /> Ready to start your coding journey?
                            </p>
                            <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
                                <Link to="/register" className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:w-auto">
                                    Get Started
                                </Link>
                                <Link to="/courses" className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-bold leading-6 text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-gray-100 md:w-auto">
                                    View Courses
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative z-50 flex flex-col items-end justify-center w-full h-full lg:w-1/2 ms:pl-10">
                    <div className="container relative left-0 w-full max-w-4xl lg:absolute xl:max-w-6xl lg:w-screen">
                        <img src="https://cdn.devdojo.com/images/september2020/macbook-mockup.png"
                            className="w-full h-auto mt-20 mb-20 ml-0 lg:mt-24 xl:mt-40 lg:mb-0 lg:h-full lg:-ml-12" />
                    </div>
                </div>
            </div>
        </div>




    );
};

export default Test;