<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Situation;
use App\User;
use Validator;

class SituationsController extends Controller
{
    public function index()
    {
        $situations = Situation::all();
        return response()->json($situations);
    }

    public function show($id)
    {
        $situation = Situation::find($id);

        if(!$situation) {
            return response()->json(['message' => 'Situation not found'], 404);
        }

        return response()->json($situation);
    }

    public function store(Request $request)
    {   
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json(['messages' => $validator->messages()], 400);
        }

        $data = [
            "name" => $request->name,
        ];

        $situation = new Situation();
        $situation->fill($data);
        $situation->save();

        return response()->json($situation, 201);
    }

    public function update(Request $request, $id)
    {
        $situation = Situation::find($id);

        if(!$situation) {
            return response()->json(['message' => 'Situation not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json(['messages' => $validator->messages()], 400);
        }

        $data = [
            "name" => $request->name,
        ];

        $situation->fill($data);
        $situation->save();

        return response()->json($situation);
    }

    public function destroy($id)
    {
        $situation = Situation::find($id);

        if(!$situation) {
            return response()->json(['message' => 'Situation not found'], 404);
        }

        $situation->delete();
    }
}
