import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

export function Slider({onPress}: {onPress: (idx: number) => void}) {
  const index = useSharedValue(0);

  const rTransY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(interpolate(index.value, [0, 4], [40, 200]), {
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  const handleOnPress = (idx: number) => {
    index.value = idx;
    onPress(idx);
  };

  return (
    <View style={styles.slider}>
      <Animated.View style={[styles.orbitMove, rTransY]} />
      <TouchableOpacity onPress={() => handleOnPress(0)}>
        <View style={styles.orbitSpace}>
          <View style={styles.circle} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOnPress(1)}>
        <View style={styles.orbitSpace}>
          <View style={styles.circle} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOnPress(2)}>
        <View style={styles.orbitSpace}>
          <View style={styles.circle} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOnPress(3)}>
        <View style={styles.orbitSpace}>
          <View style={styles.circle} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOnPress(4)}>
        <View style={styles.orbitSpace}>
          <View style={styles.circle} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  slider: {
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    right: 10,
    gap: 10,
  },
  orbitMove: {
    justifyContent: 'center',
    borderColor: '#c3c3c3',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 30,
    borderWidth: 1,
    height: 30,
    width: 30,
  },
  orbitSpace: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 30,
    height: 30,
    width: 30,
  },
  circle: {
    backgroundColor: '#c3c3c3',
    borderRadius: 10,
    height: 10,
    width: 10,
  },
});
