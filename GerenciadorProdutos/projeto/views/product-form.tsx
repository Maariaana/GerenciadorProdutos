import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import ProductContext from "../context/product-context";

export default ({ navigation, route }: any) => {
  const { dispatch }: any = useContext(ProductContext);
  const [product, setProduct] = useState(route.params || {});

  const handleSubmit = () => {
    dispatch({
      type: product.id ? "updateProduct" : "addProduct",
      payload: product,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.form}>
      <Text>Nome do Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={product.name}
        onChangeText={(name) => setProduct({ ...product, name })}
      />
      <Text>Categoria</Text>
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={product.category}
        onChangeText={(category) => setProduct({ ...product, category })}
      />
      <Text>Quantidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={product.quantity?.toString()}
        onChangeText={(quantity) =>
          setProduct({ ...product, quantity: parseInt(quantity) })
        }
      />
      <Text>Preço</Text>
      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={product.price?.toString()}
        onChangeText={(price) =>
          setProduct({ ...product, price: parseFloat(price) })
        }
      />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});