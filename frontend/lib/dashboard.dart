// ignore_for_file: use_build_context_synchronously

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:frontend/config.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:velocity_x/velocity_x.dart';
import 'package:http/http.dart' as http;

class Dashboard extends StatefulWidget {
  final String token;
  const Dashboard({
    Key? key,
    required this.token,
  }) : super(key: key);

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  TextEditingController todoTitle = TextEditingController();
  TextEditingController todoDesc = TextEditingController();
  late String userId;
  List? items;

  @override
  void initState() {
    super.initState();
    Map<String, dynamic> jwtDecodedToken = JwtDecoder.decode(widget.token);
    userId = jwtDecodedToken['_id'];
    getTodoList(userId);
    print('token   :  ${widget.token}');
    print('token   :  $userId');
  }

  void addTodo() async {
    if (todoTitle.text.isNotEmpty && todoDesc.text.isNotEmpty) {
      var todoBody = {
        "userId": userId,
        "title": todoTitle.text,
        "description": todoDesc.text
      };

      var response = await http.post(
        Uri.parse(addtodo),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(todoBody),
      );

      var jsonResponse = jsonDecode(response.body);

      print(jsonResponse);

      if (jsonResponse['status']) {
        todoTitle.clear();
        todoDesc.clear();
        Navigator.pop(context);
        getTodoList(userId);
      } else {
        print('Something went wrong');
      }
    }
  }

  void getTodoList(userId) async {
    var body = {"userId": userId};

    // var response = await http.post(
    //   Uri.parse(getToDoList),
    //   headers: {"Content-Type": "application/json"},
    //   body: jsonEncode(body),
    // );

    var newUri = Uri.parse(getToDoList).replace(queryParameters: body);

    var response = await http.get(
      newUri,
      headers: {"Content-Type": "application/json"},
    );

    var jsonResponse = jsonDecode(response.body);

    // print('jsonResponse :::: $jsonResponse');

    items = jsonResponse['success'];
    setState(() {});
    // if (jsonResponse['status']) {
    // } else {
    //   print('Something went wrong');
    // }
  }

  void deleteItem(docId) async {
    var body = {
      "id": docId,
    };

    var response = await http.post(
      Uri.parse(deleteTodo),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(body),
    );

    var jsonResponse = jsonDecode(response.body);
    print('item : : : : ${jsonResponse['status']}');
    print('item : : : : ${jsonResponse['success']}');
    if (jsonResponse['status']) {
      getTodoList(userId);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.lightBlueAccent,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const TopSection(),
          Expanded(
            child: Container(
              decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(20),
                      topRight: Radius.circular(20))),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: items == null
                    ? null
                    : ListView.builder(
                        itemCount: items!.length,
                        itemBuilder: (context, int index) {
                          return Slidable(
                            key: const ValueKey(0),
                            endActionPane: ActionPane(
                              motion: const ScrollMotion(),
                              dismissible: DismissiblePane(onDismissed: () {}),
                              children: [
                                SlidableAction(
                                  backgroundColor: const Color(0xFFFE4A49),
                                  foregroundColor: Colors.white,
                                  icon: Icons.delete,
                                  label: 'Delete',
                                  onPressed: (BuildContext context) {
                                    print('${items![index]['_id']}');
                                    deleteItem('${items![index]['_id']}');
                                  },
                                ),
                              ],
                            ),
                            child: Card(
                              borderOnForeground: false,
                              child: ListTile(
                                leading: const Icon(Icons.task),
                                title: Text('${items![index]['title']}'),
                                subtitle:
                                    Text('${items![index]['description']}'),
                                trailing: const Icon(Icons.arrow_back),
                              ),
                            ),
                          );
                        }),
              ),
            ),
          )
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => displayTextInputDialog(context),
        tooltip: 'Add-ToDo',
        child: const Icon(Icons.add),
      ),
    );
  }

  Future<void> displayTextInputDialog(BuildContext context) async {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
              title: const Text('Add To-Do'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextField(
                    controller: todoTitle,
                    keyboardType: TextInputType.text,
                    decoration: const InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        hintText: "Title",
                        border: OutlineInputBorder(
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0)))),
                  ).p4().px8(),
                  TextField(
                    controller: todoDesc,
                    keyboardType: TextInputType.text,
                    decoration: const InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        hintText: "Description",
                        border: OutlineInputBorder(
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0)))),
                  ).p4().px8(),
                  ElevatedButton(
                      onPressed: () {
                        addTodo();
                      },
                      child: const Text("Add"))
                ],
              ));
        });
  }
}

class TopSection extends StatelessWidget {
  const TopSection({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(
          top: 60.0, left: 30.0, right: 30.0, bottom: 30.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          CircleAvatar(
            backgroundColor: Colors.white,
            radius: 30.0,
            child: Icon(Icons.list, size: 30.0),
          ),
          SizedBox(height: 10.0),
          Text(
            'ToDo with NodeJS + Mongodb',
            style: TextStyle(fontSize: 30.0, fontWeight: FontWeight.w700),
          ),
          SizedBox(height: 8.0),
          Text('5 Task', style: TextStyle(fontSize: 20)),
        ],
      ),
    );
  }
}
