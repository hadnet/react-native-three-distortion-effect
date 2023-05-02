import type {RootState} from '@react-three/fiber';

// avoid error: EXGL: gl.pixelStorei() doesn't support this parameter yet!
export const onCreated = (state: RootState) => {
  const _gl = state.gl.getContext() as any;
  const pixelStorei = _gl.pixelStorei.bind(_gl);
  _gl.pixelStorei = function (...args: any[]) {
    const [parameter] = args;
    switch (parameter) {
      case _gl.UNPACK_FLIP_Y_WEBGL:
        return pixelStorei(...args);
    }
  };
};
