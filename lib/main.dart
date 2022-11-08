import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:my_app/Repository/auth_repository.dart';
import 'package:my_app/Screens/home_screen.dart';
import 'package:my_app/Screens/login_screen.dart';
import 'package:my_app/colors.dart';
import 'package:my_app/models/error_model.dart';

void main() {
  runApp(ProviderScope(child: const MyApp()));
}

class MyApp extends ConsumerStatefulWidget {
  const MyApp({super.key});

  @override
  ConsumerState<MyApp> createState() => _MyAppState();
}

class _MyAppState extends ConsumerState<MyApp> {
  ErrorModel? errorModel;
  @override
  void initState() {
    super.initState();
    getUserData();
  }

  void getUserData() async {
    errorModel = await ref.read(authRepositoryProvider).getUserData();

    if (errorModel != null && errorModel!.data != null) {
      ref.read(userProvider.notifier).update((state) => errorModel!.data);
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(userProvider);
    return MaterialApp(
        title: 'Flutter Demo $kBlackColor',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: user == null ? const LoginScreen() : const HomeScreen());
  }
}
