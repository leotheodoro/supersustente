<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Comment;

class CommentsController extends Controller
{
    public function index()
    {
        $comments = Comment::all(); 
        return response()->json($comments);
    }

    public function show($id)
    {
        $comments = Comment::where('register_id', $id)->get();

        if(!$comments || $comments == []) {
            return response()->json(['message' => 'Comments not found'], 404);
        }

        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'register_id' => 'required|numeric',
            'user_id' => 'required|numeric',
            'comment' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json(['messages' => $validator->messages()], 400);
        }

        $data = [
            "register_id" => $request->register_id,
            "user_id" => $request->user_id,
            "comment" => $request->comment,
        ];

        $comment = new Comment();
        $comment->fill($data);
        $comment->save();

        return response()->json($comment, 201);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);

        if(!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'register_id' => 'required|numeric',
            'user_id' => 'required|numeric',
            'comment' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json(['messages' => $validator->messages()], 400);
        }

        $data = [
            "comment" => $request->comment,
        ];
        
        foreach($data as $key => $value) {
            if(empty($data[$key])) {
                unset($data[$key]);
            }
        }

        $comment->fill($data);
        $comment->save();

        return response()->json($comment);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);

        if(!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $comment->delete();
    }
}
