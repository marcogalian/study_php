import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';

const Code = ({ code, changeStateModal }) => {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);

    const { data, setData, patch, processing, reset, errors } = useForm({
        title: code.title,
        code: code.code
    })

    const submit = (e) => {
        e.preventDefault();
        patch(route('codes.update', code.id), { onSuccess: () => setEditing(false) });
    }


    return (
        <div className="p-6 flex space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">{code.user.name}</span>
                        <small className="ml-2 text-sm text-gray-600">{new Date(code.created_at).toLocaleString()}</small>
                        {/* Esta linea de abajo actua como un operador ternario, pero en lugar de hacerlo asi:{ code.created_at !== code.updated_at ? <small className="text-sm text-gray-600"> &middot; edited</small> : null }
                    lo hace con doble ampersand, si la comparativa es verdadera, muestra el siguiente codigo sino no hace nada */}
                        {code.created_at !== code.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}

                    </div>
                    {code.user.id === auth.user.id &&
                        /* Si el usuario que ha escrito el post es el mismo que esta autenticado, entonces se muestran los 3 puntitos y puede hacer dropdown para utilizar las opciones y asi modificar su propio post */
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                {/* <Dropdown.Link
                                    as="button"
                                    href={route('codes.destroy', code.id)}
                                    method="delete">
                                    Delete
                                </Dropdown.Link> */}
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    onClick={() => changeStateModal(true)} // Mostrar el modal al hacer clic en "Eliminar"
                                >
                                    Delete
                                </button>
                            </Dropdown.Content>

                        </Dropdown>
                    }
                </div>
                {/* Ahora en caso de que exista la varible de estado editing utilizamos un operador ternario  */}
                {editing
                    ? <form onSubmit={submit}>
                        <input
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            type='text'
                            className='mb-3 block w-full border-gray-300 focus:border-indigo-300 focu:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-md'
                            autoFocus
                        />
                        <textarea
                            value={data.code}
                            onChange={e => setData('code', e.target.value)}
                            className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        >
                        </textarea>
                        <InputError message={errors.code} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton
                                className="mt-4 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium px-6 py-2.5 shadow-md"
                            >
                                Save
                            </PrimaryButton>
                            <button
                                className="mt-4"
                                onClick={() => { setEditing(false); reset(); clearErrors(); }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    : (
                        <>
                            <p className="mt-4 text-lg text-gray-900">{code.title}</p>

                            {/* <p className="mt-4 text-lg text-gray-900">{code.code}</p> */}

                            <SyntaxHighlighter language="php" style={dracula}>
                                {code.code}
                            </SyntaxHighlighter>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Code
