import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductList from "./views/product-list";
import ProductForm from "./views/product-form";
import { ProductProvider } from "./context/product-context";
import { Button, Icon } from "react-native-elements";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProductList">
          <Stack.Screen
            name="ProductList"
            component={ProductList}
            options={({ navigation }) => ({
              title: "Produtos",
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("ProductForm")}
                  icon={
                    <Icon
                      name="add"
                      size={25}
                      color="white" // Cor do ícone
                    />
                  }
                  buttonStyle={{
                    backgroundColor: "#28a745", // Cor do botão
                    marginRight: 10, // Espaçamento do botão
                  }}
                />
              ),
            })}
          />
          <Stack.Screen 
            name="ProductForm" 
            component={ProductForm} 
            options={({
              title: "Produto",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}