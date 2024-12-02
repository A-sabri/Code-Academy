import React from 'react';
import { Link } from 'react-router-dom';

const isLoggedIn = !!localStorage.getItem('userId');

const Home = () => {
    return (
        <div className="relative w-full h-full bg-white">
            <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-20 max-w-7xl">
                <div className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto lg:flex-row xl:px-0">
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
                                    {isLoggedIn ? (
                                        <>
                                            <Link to="/courses" className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-bold leading-6 text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-gray-100 md:w-auto">
                                                View Courses
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/register" className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:w-auto">
                                                Get Started
                                            </Link>
                                            <Link to="/courses" className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-bold leading-6 text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-gray-100 md:w-auto">
                                                View Courses
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative m-6">
                        <img
                            src="./CA-home-wallpeper_page-0001 (1).jpg"
                            alt="Code Academy"
                            className="object-contain w-full h-max"
                        />
                    </div>
                </div>

                <div id="features" className="relative w-full px-8 py-10 md:py-16 lg:py-24 xl:py-40 xl:px-0">
                    <div className="container flex flex-col items-center justify-between h-full max-w-6xl mx-auto">
                        <h2 className="my-5 text-base font-medium tracking-tight text-indigo-500 uppercase">Our Features</h2>
                        <h3
                            className="max-w-2xl px-5 mt-2 text-3xl font-black leading-tight text-center text-gray-900 sm:mt-0 sm:px-0 sm:text-6xl">
                            Why Choose Code Academy ?</h3>
                        <div className="flex flex-col w-full mt-0 lg:flex-row sm:mt-10 lg:mt-20">

                            <div className="w-full max-w-md p-4 mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                                    <svg className="absolute w-full h-full text-gray-100 fill-current" viewBox="0 0 377 340"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <g>
                                                <path
                                                    d="M342.8 3.7c24.7 14 18.1 75 22.1 124s18.6 85.8 8.7 114.2c-9.9 28.4-44.4 48.3-76.4 62.4-32 14.1-61.6 22.4-95.9 28.9-34.3 6.5-73.3 11.1-95.5-6.2-22.2-17.2-27.6-56.5-47.2-96C38.9 191.4 5 151.5.9 108.2-3.1 64.8 22.7 18 61.8 8.7c39.2-9.2 91.7 19 146 16.6 54.2-2.4 110.3-35.6 135-21.6z" />
                                            </g>
                                        </g>
                                    </svg>

                                    <img className="relative w-20 h-20" src="./undraw_book_lover_re_rwjy.svg"/>
                                    
                                    <h4 className="relative mt-6 text-lg font-bold">High Quality Curriculum</h4>
                                    <p className="relative mt-2 text-base text-center text-gray-600">
                                        Our curriculum is designed by industry experts and is constantly updated to meet the latest standards.
                                    </p>
                                    <a href="#_" className="relative flex mt-2 text-sm font-medium text-indigo-500 underline">Learn
                                        More</a>
                                </div>
                            </div>

                            <div className="w-full max-w-md p-4 mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                                    <svg className="absolute w-full h-full text-gray-100 fill-current" viewBox="0 0 358 372"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <g>
                                                <path
                                                    d="M315.7 6.5c30.2 15.1 42.6 61.8 41.5 102.5-1.1 40.6-15.7 75.2-24.3 114.8-8.7 39.7-11.3 84.3-34.3 107.2-23 22.9-66.3 23.9-114.5 30.7-48.2 6.7-101.3 19.1-123.2-4.1-21.8-23.2-12.5-82.1-21.6-130.2C30.2 179.3 2.6 141.9.7 102c-2-39.9 21.7-82.2 57.4-95.6 35.7-13.5 83.3 2.1 131.2 1.7 47.9-.4 96.1-16.8 126.4-1.6z" />
                                            </g>
                                        </g>
                                    </svg>


                                    <img className="relative w-20 h-20" src="./undraw_teaching_re_g7e3.svg"/>

                                    <h4 className="relative mt-6 text-lg font-bold">Expert Instructors</h4>
                                    <p className="relative mt-2 text-base text-center text-gray-600">
                                        Learn from experienced instructors who are passionate about teaching and helping you succeed.
                                    </p>
                                    <a href="#_" className="relative flex mt-2 text-sm font-medium text-indigo-500 underline">Learn
                                        More</a>
                                </div>
                            </div>

                            <div className="w-full max-w-md p-4 mx-auto mb-16 lg:mb-0 lg:w-1/3">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                                    <svg className="absolute w-full h-full text-gray-100 fill-current" viewBox="0 0 378 410"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <g>
                                                <path
                                                    d="M305.9 14.4c23.8 24.6 16.3 84.9 26.6 135.1 10.4 50.2 38.6 90.3 43.7 137.8 5.1 47.5-12.8 102.4-50.7 117.4-37.9 15.1-95.7-9.8-151.7-12.2-56.1-2.5-110.3 17.6-130-3.4-19.7-20.9-4.7-82.9-11.5-131.2C25.5 209.5-3 174.7 1.2 147c4.2-27.7 41-48.3 75-69.6C110.1 56.1 141 34.1 184 17.5c43.1-16.6 98.1-27.7 121.9-3.1z" />
                                            </g>
                                        </g>
                                    </svg>

                                    <img className="relative w-20 h-20" src="./undraw_online_learning_re_qw08.svg"/>

                                   
                                    <h4 className="relative mt-6 text-lg font-bold">Flexible Learning</h4>
                                    <p className="relative mt-2 text-base text-center text-gray-600">
                                        Study at your own pace with our flexible online courses, accessible anytime, anywhere.
                                    </p>
                                    <a href="#_" className="relative flex mt-2 text-sm font-medium text-indigo-500 underline">Learn
                                        More</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div id="testimonials"
                    className="flex items-center justify-center w-full px-8 py-10  md:py-16 lg:py-24 xl:py-40 xl:px-0">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex-col items-center ">
                            <div className="flex flex-col items-center justify-center w-full h-full max-w-2xl pr-8 mx-auto text-center">
                                <p className="my-5 text-base font-medium tracking-tight text-indigo-500 uppercase">
                                    Our Student love our courses
                                </p>
                                <h2
                                    className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl">
                                    Testimonials</h2>
                                <p className="my-6 text-xl font-medium text-gray-500">Don't just take our word for it, read from our
                                    extensive
                                    list of case studies and students testimonials.</p>

                            </div>
                            <div className="flex flex-col items-center justify-center max-w-2xl py-8 mx-auto xl:flex-row xl:max-w-full">
                                <div className="w-full xl:w-1/2 xl:pr-8">
                                    <blockquote
                                        className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 text-center transition-all duration-200 bg-gray-100 rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease">
                                        <div className="flex flex-col pr-8">
                                            <div className="relative pl-12">
                                                <svg className="absolute left-0 w-10 h-10 text-indigo-500 fill-current"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                                    <path
                                                        d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                                </svg>
                                                <p className="mt-2 text-base text-gray-600">
                                                    Code Academy has transformed my career. The curriculum is top-notch and the instructors are incredibly supportive.
                                                </p>
                                            </div>

                                            <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">
                                                Sandra Walton
                                                <span className="mt-1 text-sm leading-5 text-gray-500 truncate">
                                                    - Student
                                                </span>
                                            </h3>
                                            <p className="mt-1 text-sm leading-5 text-gray-500 truncate"></p>
                                        </div>
                                        <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                            src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2694&q=80"
                                            alt="" />
                                    </blockquote>
                                    <blockquote
                                        className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 mt-16 mb-16 text-center transition-all duration-200 bg-gray-100 rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease xl:mb-0">
                                        <div className="flex flex-col pr-10">
                                            <div className="relative pl-12">
                                                <svg className="absolute left-0 w-10 h-10 text-indigo-500 fill-current"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                                    <path
                                                        d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                                </svg>
                                                <p className="mt-2 text-base text-gray-600">
                                                    Code Academy's courses were invaluable in my career switch from business to software engineering. I landed a Software Developer role at Amazon,
                                                </p>
                                            </div>
                                            <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">
                                                Kenny Jones
                                                <span className="mt-1 text-sm leading-5 text-gray-500 truncate">
                                                    - Student
                                                </span>
                                            </h3>
                                            <p className="mt-1 text-sm leading-5 text-gray-500 truncate"></p>
                                        </div>
                                        <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                            src="https://images.unsplash.com/photo-1546820389-44d77e1f3b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"
                                            alt="" />
                                    </blockquote>
                                </div>
                                <div className="w-full xl:w-1/2 xl:pl-8">
                                    <blockquote
                                        className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 text-center transition-all duration-200 bg-gray-100 rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease">
                                        <div className="flex flex-col pr-10">
                                            <div className="relative pl-12">
                                                <svg className="absolute left-0 w-10 h-10 text-indigo-500 fill-current"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                                    <path
                                                        d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                                </svg>
                                                <p className="mt-2 text-base text-gray-600">
                                                    I love the flexibility of learning at my own pace. The course content is comprehensive and easy to follow.
                                                </p>
                                            </div>

                                            <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">
                                                Mike Smith
                                                <span className="mt-1 text-sm leading-5 text-gray-500 truncate">
                                                    - Student
                                                </span>
                                            </h3>
                                            <p className="mt-1 text-sm leading-5 text-gray-500 truncate"></p>
                                        </div>
                                        <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80"
                                            alt="" />
                                    </blockquote>
                                    <blockquote
                                        className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 mt-16 text-center transition-all duration-200 bg-gray-100 rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease">
                                        <div className="flex flex-col pr-10">
                                            <div className="relative pl-12">
                                                <svg className="absolute left-0 w-10 h-10 text-indigo-500 fill-current"
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                                    <path
                                                        d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                                </svg>
                                                <p className="mt-2 text-base text-gray-600">
                                                    The hands-on projects and real-world examples helped me gain practical skills that I could immediately apply in my job.
                                                </p>
                                            </div>
                                            <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">
                                                Molly Sanchez
                                                <span className="mt-1 text-sm leading-5 text-gray-500 truncate">
                                                    - Student
                                                </span>
                                            </h3>
                                            <p className="mt-1 text-sm leading-5 text-gray-500 truncate"></p>
                                        </div>
                                        <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
                                            alt="" />
                                    </blockquote>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
