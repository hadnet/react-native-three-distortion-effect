import {Object3DNode} from '@react-three/fiber';
import {ImageDistortionMaterial} from '../components/Effect';

declare module '@react-three/fiber' {
  interface ThreeElements {
    imageDistortionMaterial: Object3DNode<
      ImageDistortionMaterial,
      typeof ImageDistortionMaterial
    >;
  }
}
