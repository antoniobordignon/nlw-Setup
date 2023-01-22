import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native"

export function HabitsEmpty(){
    const { navigate } = useNavigation();
    return (
        <Text className="text-zinc-400 text-base">
           You have no habit for this day. {" "}
            <Text 
            className="text-violet-400 text-base underline active:text-violet-600"
            onPress={() => navigate('new')}
            >
                Start creating a.
            </Text>
        </Text>
    )
}