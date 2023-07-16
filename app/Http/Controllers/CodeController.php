<?php

namespace App\Http\Controllers;

use App\Models\Code;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Codes/Index', [
            'codes' => Code::with('user:id,name')->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
        
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|unique:codes,title|min:3|max:100',
            'code' => 'nullable|'
        ], [
            'title.required' => 'El Titulo es requerido',
            'title.min' => 'El titulo debe tener al menos :min caracteres',
            'title.max' => 'El titulo no debe sobrepasar los :max caracteres',
            'title.unique' => 'Ya existe un titulo con el mismo nombre',
        ]);

        $request->user()->codes()->create($validated);

        return redirect( route('codes.index'))->with('message', 'Codigo creado con éxito');
    }

    /**
     * Display the specified resource.
     */
    public function show(Code $code)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Code $code)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Code $code)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Code $code)
    {
        //
    }
}
