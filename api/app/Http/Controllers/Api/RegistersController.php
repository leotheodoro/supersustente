<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Register;
use App\Models\Address;
use App\Models\Localization;
use App\Models\Image;
use App\Models\Video;
use App\User;
use Validator;
use Storage;
use Carbon\Carbon;

class RegistersController extends Controller
{
    public function index()
    {
        $registers = Register::where('status', '0')->with('user')->with('images')->with('videos')->with('comments')->with('situation')->get();
        return response()->json($registers);
    }

    public function show($id)
    {
        $register = Register::where('id', $id)->where('status', '0')->with('user')->with('images')->with('videos')->with('comments')->with('situation')->first();

        if((!$register) || $register->status == '1') {
            return response()->json(['message' => 'Register not found'], 404);
        }

        return response()->json($register);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric',
            'title' => 'required',
            'description' => 'required',
            'situation_id' => 'required|numeric',
        ]);

        if($validator->fails()) {
            return response()->json(['messages' => $validator->messages()], 400);
        }

        $data = [
            "user_id" => $request->user_id,
            "title" => $request->title,
            "description" => $request->description,
            "situation_id" => $request->situation_id,
            "address" => isset($request->address) ? $request->address : NULL,
            "neighborhood" => isset($request->neighborhood) ? $request->neighborhood : NULL,
            "city" => isset($request->city) ? $request->city : NULL,
            "state" => isset($request->state) ? $request->state : NULL,
            "country" => isset($request->country) ? $request->country : NULL,
            "lat" => isset($request->lat) ? $request->lat : NULL,
            "lon" => isset($request->lon) ? $request->lon : NULL,
            "anonymous" => $request->anonymous,
            "status" => '0',
        ];

        
        $register = new Register();
        $register->fill($data);
        $register->save();

        // Upload of multiple images
        if($images = $request->images) {
            foreach($images as $image) {
                $name = str_random(5).str_random(5).str_random(5);
                $extension = $image->extension();
                if($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg')
                    return response()->json(['message' => 'Please, insert a valid format (jpg, png or jpeg)', 's' => $extension], 400);
                $nameFile = "{$name}.{$extension}";
                $upload = $image->storeAs('public/registerImages', $nameFile);
                if(!$upload)
                    return response()->json(['message' => 'Image could not be uploaded'], 400);
        
                Image::insert([
                    'register_id' => $register->id,
                    'path' => $nameFile,
                ]);
            }
        }

        // Upload of multiple videos
        if($videos = $request->videos) {
            foreach($videos as $video) {
                $name = str_random(5).str_random(5).str_random(5);
                $extension = $video->extension();

                if($extension != 'mp4')
                    return response()->json(['message' => 'Please, insert a valid format (mp4)'], 400);

                $nameFile = "{$name}.{$extension}";
                $upload = $video->storeAs('public/registerVideos', $nameFile);
                if(!$upload)
                    return response()->json(['message' => 'Video could not be uploaded'], 400);
        
                Video::insert([
                    'register_id' => $register->id,
                    'path' => $nameFile,
                ]);
            }
        }


        return response()->json($register, 201);
    }
            
    public function update(Request $request, $id)
    {
        $register = Register::where('id', $id)->where('status', '0')->first();

        if(!$register) {
            return response()->json(['message' => 'Register not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric',
            'title' => 'required',
            'description' => 'required',
            'situation_id' => 'required|numeric',
        ]);

        if($validator->fails()) {
            return response()->json(['messages' => $validator->messages()], 400);
        }

        $data = [
            "title" => $request->title,
            "description" => $request->description,
            "situation_id" => $request->situation_id,
            "localization_type" => $request->localization_type,
            "address" => $request->address,
            "neighborhood" => $request->neighborhood,
            "city" => $request->city,
            "state" => $request->state,
            "country" => $request->country,
            "status" => '0',
        ];

        foreach($data as $key => $value) {
            if(empty($data[$key])) {
                unset($data[$key]);
            }
        }

        $register->fill($data);
        $register->save();

        // Upload of multiple images
        // if($images = $request->images) {
        //     foreach($images as $image) {
        //         $name = str_random(5).kebab_case($data['title']).str_random(5);
        //         $extension = $image->extension();
        //         if($extension != 'jpg' && $extension != 'png' && $extension != 'jpeg')
        //             return response()->json(['message' => 'Please, insert a valid format (jpg, png or jpeg)', 's' => $extension], 400);
        //         $nameFile = "{$name}.{$extension}";
        //         $upload = $image->storeAs('registerImages', $nameFile);
        //         if(!$upload)
        //             return response()->json(['message' => 'Image could not be uploaded'], 400);
        
        //         Image::insert([
        //             'register_id' => $register->id,
        //             'path' => $nameFile,
        //         ]);
        //     }
        // }

        // Upload of multiple videos
        // if($videos = $request->videos) {
        //     foreach($videos as $video) {
        //         $name = str_random(5).kebab_case($data['title']).str_random(5);
        //         $extension = $video->extension();

        //         if($extension != 'mp4')
        //             return response()->json(['message' => 'Please, insert a valid format (mp4)'], 400);

        //         $nameFile = "{$name}.{$extension}";
        //         $upload = $video->storeAs('registerVideos', $nameFile);
        //         if(!$upload)
        //             return response()->json(['message' => 'Video could not be uploaded'], 400);
        
        //         Video::insert([
        //             'register_id' => $register->id,
        //             'path' => $nameFile,
        //         ]);
        //     }
        // }

        return response()->json($register);
    }

    public function destroy($id)
    {
        $register = Register::where('id', $id)->where('status', '0')->first();

        if(!$register) {
            return response()->json(['message' => 'Register not found'], 404);
        }

        $register->status = '1';
        $register->save();
    }

    public function destroyImage($id)
    {
        $image = Image::find($id);

        if(!$image)
            return response()->json(['message' => 'Image not found'], 404);

        Storage::delete("registerImages/{$image->path}");
        $image->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function destroyVideo($id)
    {
        $video = Video::find($id);

        if(!$video)
            return response()->json(['message' => 'Video not found'], 404);

        Storage::delete("registerVideos/{$video->path}");
        $video->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function findByUser($id)
    {
        $registers = Register::where('user_id', $id)->where('status', '0')->with('user')->with('images')->with('situation')->get();

        if(!$registers)
            return response()->json(['message' => 'Registers not found'], 404);

        return response()->json($registers);
    }
}
