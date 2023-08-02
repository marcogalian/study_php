import Code from '@/Components/Code';
import React from 'react'
import ConfirmModal from '@/Components/ConfirmModal';
import { Link, Head } from '@inertiajs/react';


const Welcome = ({ auth, codes, changeStateModal, postId, deletePost, idPost }) => {
    
    let showEditDelete = false;

    return (
        <>
            <Head title="Welcome" />
            <div className="relative bg-slate-100 h-full w-full">
                <div className="z-10 sm:fixed sm:top-0 sm:right-0 p-6 text-right bg-white shadow-md w-full">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <ConfirmModal
                    changeStateModal={changeStateModal}
                    postId={postId}
                    deletePost={deletePost}
                    idPost={idPost}  
                />
            </div>
            <div className='max-w-4xl mx-auto sm:p-6 lg:p-8 mt-20'>
                {
                    codes.map(code =>
                        <div key={code.id} className='w-full bg-white shadow-sm rounded-md mb-4'>
                            <Code  
                                code={code}
                                changeStateModal={changeStateModal} 
                                postId={postId}
                                deletePost={deletePost}
                                idPost={idPost}
                                showEditDelete={showEditDelete}
                            />
                        </div>
                )}
            </div>
        </>
    );
}

export default Welcome