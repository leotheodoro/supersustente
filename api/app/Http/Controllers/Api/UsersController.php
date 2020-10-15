<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserFormRequest;
use App\User;

use Illuminate\Support\Facades\Hash;
use Validator;
use Storage;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::where('status', '0')->get();
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::where('id', $id)->where('status', '0')->with('comments')->with('registers')->first();

        if(!$user) { 
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function store(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'gender' => 'size:1',
        ]);

        if($validator->fails()) {
            return response()->json(['messages' => $validator->messages()], 400);
        }
        
        $data = [
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password),
            "gender" => $request->gender,
            "status" => '0'
        ];

        if($request->hasFile('image') && $request->file('image')->isValid()) {
            $name = str_random(5).kebab_case($data['name']).str_random(5);
            $extension = $request->image->extension();

            if($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg')
                return response()->json(['message' => 'Please, insert a valid format (jpg, png or jpeg)'], 400);

            $nameFile = "{$name}.{$extension}";
            $data['image'] = $nameFile;
            $upload = $request->image->storeAs('public/users', $nameFile);
            if(!$upload)
                return response()->json(['message' => 'Image could not be uploaded'], 400);
        }

        $user = new User();
        $user->fill($data);
        $user->remember_token = str_random(60);
        $user->save();

        $request->session()->put('token', $user->remember_token);

        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::where('id', $id)->where('status', '0')->first();

        if(!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $data = [
            "name" => $request->name,
            "email" => $request->email,
            "password" => $request->password,
            "gender" => $request->gender,
        ];
        
        foreach($data as $key => $value) {
            if(empty($data[$key])) {
                unset($data[$key]);
            }
        }

        if(isset($data['password']))
            $data['password'] = bcrypt($data['password']);


        $user->fill($data);
        $user->save();

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->status = '1';
        $user->save();
    }

    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;
        
        $user = User::where('email', $email)->where('status', '0')->first();
        
        if(!$user || !Hash::check($password, $user->password)) {
            return response()->json(['message'=> 'Sorry, email or password wrong!'], 400);
        }

        $user->remember_token = str_random(60);
        $user->save();

        $request->session()->put('token', $user->remember_token);

        return response()->json($user);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('token');
        return response()->json(['message' => 'Sign out with success'], 200);

    }

    public function check(Request $request)
    {
        $token = $request->token;

        if($token) {
            $user = User::where('remember_token', $token)->first();
            if(!$user) {
                return response()->json(['message' => 'Could not found token'], 404);
            }
            return response()->json(['token' => $user->remember_token]);
        }
    }

    public function updateImage(Request $request, $id)
    {
        $user = User::where('id', $id)->where('status', '0')->first();
        if($request->hasFile('image') && $request->file('image')->isValid()) {
            if($user->image)
                $name = $user->image;
            else
                $name = $user->id.kebab_case($user->name);
            $extension = $request->image->extension();
            $nameFile = "{$name}.{$extension}";
            $data['image'] = $nameFile;
            $upload = $request->image->storeAs('public/users', $nameFile);
            if(!$upload)
                return redirect()
                    ->back()
                    ->with('error', 'Falha ao fazer upload da imagem!');
        }

        $user->fill($data);
        $user->save();

        return response()->json($user);
    }
}
