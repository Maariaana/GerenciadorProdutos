import React, { useContext } from "react";
import { View, FlatList, Alert, Platform, StyleSheet } from "react-native";
import { Button, Icon, ListItem, Text } from "react-native-elements";
import ProductContext from "../context/product-context";

interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

export default ({ navigation }: any) => {
  const { state, dispatch }: any = useContext(ProductContext);

  const confirmDeletion = (product: Product) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        `Deseja realmente excluir o produto ${product.name}?`
      );
      if (confirmed) handleDelete(product);
    } else {
      Alert.alert(
        "Excluir Produto",
        `Deseja realmente excluir o produto ${product.name}?`,
        [
          { text: "Sim", onPress: () => handleDelete(product) },
          { text: "Não" },
        ]
      );
    }
  };

  const handleDelete = (product: Product) => {
    dispatch({ type: "deleteProduct", payload: product });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ListItem>
      <View style={styles.card}>
      <View style={styles.cardContent}>
        <View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
      <Button
        onPress={() => navigation.navigate("ProductForm", item)}
        type="clear"
        icon={<Icon name="edit" size={25} color="#007bff" />}
      />
      <Button
        onPress={() => confirmDeletion(item)}
        type="clear"
        icon={<Icon name="delete" size={25} color="#e62e00" />}
      />
      </View>
      </View>
        </View>
    </ListItem>
  );  

  return (
    <View>
      <FlatList
        keyExtractor={(item: Product) => item.id.toString()}
        data={state.products}
        renderItem={renderProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 4, // Sombra (Android)
    shadowColor: "#000", // Sombra (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between", // Mantém texto e ícones distantes
    alignItems: "center", // Alinha verticalmente
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#28a745",
    marginTop: 5,
  },
  actions: {
    flexDirection: "row", // Coloca os botões lado a lado
  },
});