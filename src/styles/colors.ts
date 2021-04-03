import chroma from 'chroma-js'
import opacity from './opacity'

const colors = {
  primary: '#36485E',
  secondary: '#FF6A14',
  light: '#F9F9F9',
  lightOpaque: chroma('#F9F9F9').alpha(opacity.sm).hex(),
}

export default colors
