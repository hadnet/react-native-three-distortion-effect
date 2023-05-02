import * as THREE from 'three';
import {GridHelper, Mesh} from 'three';
import {useRef, useEffect} from 'react';
import {extend, useFrame, useThree} from '@react-three/fiber';
import {useAnimatedSensor, SensorType} from 'react-native-reanimated';
import {useTexture, shaderMaterial} from '@react-three/drei/native';
import {gsap} from 'gsap-rn';

const vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0.7 );
}
`;

const fragment = `
varying vec2 vUv;

uniform sampler2D currentImage;
uniform sampler2D next1Image;

uniform float dispFactor;

void main() {

    vec2 uv = vUv;
    vec4 _currentImage;
    vec4 _nextImage;
    float intensity = 0.3;

    vec4 orig1 = texture2D(currentImage, uv);
    vec4 orig2 = texture2D(next1Image, uv);
    
    _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));

    _nextImage = texture2D(next1Image, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));

    vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

    gl_FragColor = finalTexture;
}
`;

export class ImageDistortionMaterial extends GridHelper {
  dispFactor!: number;
  currentImage!: THREE.Texture;
  next1Image!: THREE.Texture;
  next2Image!: THREE.Texture;
  next3Image!: THREE.Texture;
  next4Image!: THREE.Texture;
}

export const imageDistortionMaterial = shaderMaterial(
  {
    dispFactor: 0,
    currentImage: null,
    next1Image: null,
    next2Image: null,
    next3Image: null,
    next4Image: null,
  },
  vertex,
  fragment,
);

extend({ImageDistortionMaterial: imageDistortionMaterial});

export function DistortionImageEffect({index}: {index: number}) {
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 150,
  });
  const ref = useRef<ImageDistortionMaterial>(null);
  const meshRef = useRef<Mesh>(null);
  const idx = useRef(0);
  const tracer = useRef(0);
  const {gl} = useThree();

  const texture = useTexture(
    [
      require('../../assets/tiger.jpg'),
      require('../../assets/cheetah.jpg'),
      require('../../assets/leopard.jpg'),
      require('../../assets/bear.jpg'),
      require('../../assets/lion.jpg'),
    ],
    texture => {
      (texture as THREE.Texture).magFilter = THREE.LinearFilter;
      (texture as THREE.Texture).minFilter = THREE.LinearFilter;
      (texture as THREE.Texture).anisotropy =
        gl.capabilities.getMaxAnisotropy();
    },
  );

  useFrame(() => {
    if (ref.current) {
      ref.current.dispFactor = THREE.MathUtils.lerp(
        ref.current.dispFactor,
        idx.current,
        0.075,
      );
    }
    if (meshRef.current?.rotation) {
      let {x, y} = animatedSensor.sensor.value;
      x = ~~(x * 100) / 42000;
      y = ~~(y * 100) / 42000;
      meshRef.current.rotation.x += x;
      meshRef.current.rotation.y += y;
    }
  });

  useEffect(() => {
    if (ref.current) {
      if (tracer.current !== 0) idx.current = 1;

      ref.current.next1Image = texture[index];
      gsap.to(idx.current, 1, {
        value: 1,
        ease: 'Expo.easeOut',
        onComplete: () => {
          if (ref.current) {
            ref.current.currentImage = texture[index];
            ref.current.dispFactor = 0;
            idx.current = 0;
            tracer.current = 1;
          }
        },
      });
    }
  }, [index]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry />
      <imageDistortionMaterial
        ref={ref}
        currentImage={texture[0]}
        next1Image={texture[1]}
        next2Image={texture[2]}
        next3Image={texture[3]}
        next4Image={texture[4]}
      />
    </mesh>
  );
}
