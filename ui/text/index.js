import styled from 'styled-components';
import {
  color,
  space,
  width,
  opacity,
  fontSize,
  maxWidth,
  textAlign,
  lineHeight,
  fontFamily,
  fontWeight,
  background
} from 'styled-system';
// //////////////////////////////////////////////////

export const Text = styled.div`
  ${space}
  ${color}
  ${width}
  ${opacity}
  ${fontSize}
  ${maxWidth}
  ${textAlign}
  ${lineHeight}
  ${background}
  ${fontFamily}
  ${fontWeight}

  cursor: ${({ cursor }) => cursor};
  word-break: ${({ wordBreak }) => wordBreak};
  text-transform: ${({ textTransform }) => textTransform};
  text-decoration: ${({ textDecoration }) => textDecoration};
  overflow: ${({ withEllipsis }) => (withEllipsis ? 'hidden' : 'initial')};
  white-space: ${({ withEllipsis }) => (withEllipsis ? 'nowrap' : 'initial')};
  text-overflow: ${({ withEllipsis }) =>
    withEllipsis ? 'ellipsis' : 'initial'};
  
  &:hover {
    color: ${({ hoveredColor }) => hoveredColor};
  }
`;
