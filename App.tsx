import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import { useState } from 'react';

const initialProducts = [
  { id: '1', name: 'Ferrari', price: 320000000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxu_Wx3QAAeYzZY2dtagoGKWWDPZFDgyJhSHT_NXr2AQ&s=10', likes: 0 },
  { id: '2', name: 'Bugatti Chiron Supersport', price: 500000000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1V9vgr8B3UqyhTGZTM609mgNh2cida4tVmN1DPo2Hbg&s=10', likes: 0 },
  { id: '3', name: 'Lamborghini Aventador', price: 240000000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSts1nlzvm_bqzCkvltssRPQOrpcYUgQ30LjKBMDkxSbA&s=10', likes: 0 },
  { id: '4', name: 'Yamaha R1', price: 120000000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmmIHjrnp6ZIm4X41ksN95CFL7lvZ0p79pnzPGAJV18Q&s=10', likes: 0 },
  { id: '5', name: 'Honda Fireblade RRR', price: 190000000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcGnombUyHm_uhfDM46UuKOk7VhIq8FoMA4jYKSR5sw&s=10', likes: 0 },
  { id: '6', name: 'Kawasaki H2R', price: 200000000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikCZAoestcMlKiHaqVM1itveSiWxvzGH-1vVoCE84BQ&s=10', likes: 0 },
  { id: '7', name: 'BMW M1000RR', price: 200000000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMutPVlOl69XkAGvkYu5iALm6y_4O-zfYm7WIqcomLw&s=10', likes: 0 },
  { id: '8', name: 'NKD', price: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfi5DkeoIWh5-NuOqaQXcofvhsrp7qsXbjcLmT0aKLqQ&s=10', likes: 0 },
];

function ProductCard({ product, onLike }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {product.name}
        </Text>

        <Text style={styles.price}>
          <Text style={styles.currencySymbol}>$ </Text>
          {product.price.toLocaleString('es-CO')}
        </Text>

        <View style={styles.likeRow}>
          <Pressable
            style={({ pressed }) => [
              styles.likeButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onLike.bind(null, product.id)}
          >
            <Text style={styles.likeIcon}>👍</Text>
          </Pressable>

          <Text style={styles.likeCount}>{product.likes} likes</Text>
        </View>
      </View>
    </View>
  );
}

export default function ProductList() {
  const [products, setProducts] = useState(initialProducts);

  function handleLike(id) {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, likes: product.likes + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
  }

  return (
    <View style={styles.outer}>
      <Text style={styles.title}>Catálogo de Productos</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onLike={handleLike} />
        )}
        contentContainerStyle={{ padding: 12, gap: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#FFE600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 220,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    padding: 14,
  },
  name: {
    fontSize: 19,
    fontWeight: '500',
    color: '#333333',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    marginTop: 4,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '400',
  },
  likeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  likeButton: {
    backgroundColor: '#3483FA',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#2968C8',
  },
  likeIcon: {
    fontSize: 16,
  },
  likeCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
});