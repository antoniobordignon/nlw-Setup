import { useState } from "react";
import { ScrollView,TextInput, Text, View, Alert, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox"
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const avaiableWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function New() {
    const [title, setTitle] = useState(''); 
    const [weekDays, setWeekDays] = useState<number[]>([]);

    function handleToggleWeekDay(weekDayIndex: number){
        if (weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function handleCreateNewHabit(){
        try {
            if(!title.trim() || weekDays.length === 0) {
                return Alert.alert("New habit", "Enter the name of the habit and choose the frequency.")
            }
            
            await api.post('/habits', {title, weekDays});

            setTitle('');
            setWeekDays([]);

            Alert.alert("New habit", "habit created successfully.");
        } catch (error) {
            console.log(error)
            Alert.alert('Whoops', "Couldn't create new habit.");
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton /> 
                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Create habit  
                </Text>
                <Text className="mt-6 text-white font-semibold text-base"> 
                    What is your goal?  
                </Text>
                <TextInput 
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder="Workout, Drink water, etc."
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />
                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    What is the recurrence?
                </Text>
                {
                    avaiableWeekDays.map((weekDay, index) => (
                        <Checkbox 
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(index)}
                        onPress={() => handleToggleWeekDay(index)}
                        /> 
                    ))
                }
                <TouchableOpacity 
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    activeOpacity={0.7}
                    onPress={handleCreateNewHabit}
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />

                    <Text className="font-semibold text-Base text-white ml-2">
                        Confirm
                    </Text>
                </TouchableOpacity>
                </ScrollView>
        </View>
    )
}