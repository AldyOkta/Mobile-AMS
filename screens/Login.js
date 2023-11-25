import {
	View,
	Text,
	Image,
	Pressable,
	TextInput,
	TouchableOpacity,
	Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/auth/authAction";
import { signOut } from "../store/auth/authSlice";

const Login = ({ navigation }) => {
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [loginPayload, setLoginPayload] = useState({
		email: "",
		password: "",
	});

	const dispatch = useDispatch();
	const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

	const handleLogin = async () => {
		if (loginPayload.email === "" && loginPayload.password === "") {
			return Alert.alert("Please Fill The Field");
		}

		await dispatch(
			signIn({
				email: loginPayload.email,
				password: loginPayload.password,
			})
		)
			.then((res) => {
				console.log(res);
				if (res.meta.requestStatus !== "fulfilled") {
					Alert.alert("Email or Password Wrong");
					return;
				}

				navigation.navigate("Home");
			})
			.catch(() => {
				Alert.alert("Email or Password Wrong");
			});
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigation.navigate("Home");
		}
	}, [navigation, isAuthenticated]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<View style={{ flex: 1, marginHorizontal: 22 }}>
				<View style={{ marginVertical: 22 }}>
					<Text
						style={{
							fontSize: 22,
							fontWeight: "bold",
							marginVertical: 12,
							color: COLORS.black,
						}}>
						Hi Welcome Back ! 👋 {isAuthenticated ? "y" : "n"}
					</Text>

					<Text
						style={{
							fontSize: 16,
							color: COLORS.black,
						}}>
						Hello again you have been missed!
					</Text>
				</View>

				<View style={{ marginBottom: 12 }}>
					<Text
						style={{
							fontSize: 16,
							fontWeight: 400,
							marginVertical: 8,
						}}>
						Email address
					</Text>

					<View
						style={{
							width: "100%",
							height: 48,
							borderColor: COLORS.black,
							borderWidth: 1,
							borderRadius: 8,
							alignItems: "center",
							justifyContent: "center",
							paddingLeft: 22,
						}}>
						<TextInput
							onChangeText={(event) =>
								setLoginPayload((prev) => ({
									...prev,
									email: event,
								}))
							}
							value={loginPayload.email}
							placeholder="Enter your email address"
							placeholderTextColor={COLORS.black}
							keyboardType="email-address"
							style={{
								width: "100%",
							}}
						/>
					</View>
				</View>

				<View style={{ marginBottom: 12 }}>
					<Text
						style={{
							fontSize: 16,
							fontWeight: 400,
							marginVertical: 8,
						}}>
						Password
					</Text>

					<View
						style={{
							width: "100%",
							height: 48,
							borderColor: COLORS.black,
							borderWidth: 1,
							borderRadius: 8,
							alignItems: "center",
							justifyContent: "center",
							paddingLeft: 22,
						}}>
						<TextInput
							value={loginPayload.password}
							onChangeText={(event) =>
								setLoginPayload((prev) => ({
									...prev,
									password: event,
								}))
							}
							placeholder="Enter your password"
							placeholderTextColor={COLORS.black}
							secureTextEntry={isPasswordShown}
							style={{
								width: "100%",
							}}
						/>

						<TouchableOpacity
							onPress={() => setIsPasswordShown(!isPasswordShown)}
							style={{
								position: "absolute",
								right: 12,
							}}>
							{isPasswordShown == true ? (
								<Ionicons name="eye-off" size={24} color={COLORS.black} />
							) : (
								<Ionicons name="eye" size={24} color={COLORS.black} />
							)}
						</TouchableOpacity>
					</View>
				</View>

				<View
					style={{
						flexDirection: "row",
						marginVertical: 6,
					}}>
					<Checkbox
						style={{ marginRight: 8 }}
						value={isChecked}
						onValueChange={setIsChecked}
						color={isChecked ? COLORS.primary : undefined}
					/>

					<Text>Remember Me</Text>
				</View>

				<Button
					title={isLoading ? "Loading.." : "Login"}
					filled
					style={{
						marginTop: 18,
						marginBottom: 4,
					}}
					onPress={handleLogin}
				/>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 20,
					}}>
					<View
						style={{
							flex: 1,
							height: 1,
							backgroundColor: COLORS.grey,
							marginHorizontal: 10,
						}}
					/>
					<Text style={{ fontSize: 14 }}>Or Login with</Text>
					<View
						style={{
							flex: 1,
							height: 1,
							backgroundColor: COLORS.grey,
							marginHorizontal: 10,
						}}
					/>
				</View>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
					}}>
					<TouchableOpacity
						onPress={() => dispatch(signOut())}
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "row",
							height: 52,
							borderWidth: 1,
							borderColor: COLORS.grey,
							marginRight: 4,
							borderRadius: 10,
						}}>
						<Image
							source={require("../assets/facebook.png")}
							style={{
								height: 36,
								width: 36,
								marginRight: 8,
							}}
							resizeMode="contain"
						/>

						<Text>Facebook</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => console.log("Pressed")}
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "row",
							height: 52,
							borderWidth: 1,
							borderColor: COLORS.grey,
							marginRight: 4,
							borderRadius: 10,
						}}>
						<Image
							source={require("../assets/google.png")}
							style={{
								height: 36,
								width: 36,
								marginRight: 8,
							}}
							resizeMode="contain"
						/>

						<Text>Google</Text>
					</TouchableOpacity>
				</View>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginVertical: 22,
					}}>
					<Text style={{ fontSize: 16, color: COLORS.black }}>
						Don't have an account ?{" "}
					</Text>
					<Pressable onPress={() => navigation.navigate("Signup")}>
						<Text
							style={{
								fontSize: 16,
								color: COLORS.primary,
								fontWeight: "bold",
								marginLeft: 6,
							}}>
							Register
						</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Login;
