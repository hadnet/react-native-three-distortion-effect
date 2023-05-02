import {useState, Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {DistortionImageEffect} from './src/components/Effect';
import {ArrowLeft} from './src/components/icons/arrow-left';
import {Slider} from './src/components/Slider';
import {animals} from './src/constants';
import {onCreated} from './src/utils';

export default function App() {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <ArrowLeft />
      <View style={styles.wrapper}>
        <Canvas
          // gl={{antialias: false}}
          // color={'0x23272a'}
          camera={{
            fov: 40,
            near: 1,
            far: 1000,
            position: [0, 0, 2],
          }}
          onCreated={onCreated}>
          <Suspense fallback={null}>
            <DistortionImageEffect {...{index}} />
          </Suspense>
        </Canvas>
      </View>
      <View style={styles.bylinePos}>
        <Text style={styles.byline}>WILDLIFE</Text>
      </View>
      <Animated.View
        style={styles.headerPos}
        key={`${index}-header`}
        entering={FadeIn.duration(2000)}
        exiting={FadeOut}>
        <Text style={styles.header}>{animals[index].name}</Text>
      </Animated.View>
      <Animated.View
        key={`${index}-description`}
        style={styles.descriptionPos}
        entering={FadeIn.duration(1500).delay(350)}
        exiting={FadeOut}>
        <View style={styles.bulletPoint} />
        <Text style={styles.description}>{animals[index].description}</Text>
      </Animated.View>
      <Slider onPress={setIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#050505',
    flex: 1,
  },
  wrapper: {
    marginTop: 50,
    flex: 1,
  },
  byline: {
    textAlign: 'center',
    color: '#474c4a',
    fontSize: 18,
  },
  bylinePos: {
    position: 'absolute',
    width: '100%',
    top: 110,
  },
  header: {
    fontFamily: 'Beast Wars',
    textAlign: 'center',
    color: '#d7d7d7',
    fontSize: 32,
  },
  headerPos: {
    position: 'absolute',
    width: '100%',
    top: 150,
    left: 0,
  },
  descriptionPos: {
    position: 'absolute',
    width: '100%',
    padding: 16,
    bottom: 30,
    left: 0,
  },
  description: {
    textAlign: 'justify',
    color: '#8b8c8b',
    lineHeight: 26,
    fontSize: 16,
  },
  bulletPoint: {
    borderColor: '#f8cc46',
    position: 'absolute',
    borderWidth: 2,
    height: 35,
    width: 25,
    top: -36,
    left: 16,
  },
});
