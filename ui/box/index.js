import styled from 'styled-components';
import {
  space,
  width,
  order,
  height,
  border,
  display,
  maxWidth,
  maxHeight,
  borderTop,
  borderLeft,
  background,
  borderColor,
  borderRight,
  borderBottom,
  borderRadius
} from 'styled-system';
// //////////////////////////////////////////////////

export const Box = styled.div`
  ${space}
  ${width}
  ${order}
  ${height}
  ${border}
  ${display}
  ${maxWidth}
  ${maxHeight}
  ${borderTop}
  ${background}
  ${borderLeft}
  ${borderRight}
  ${borderBottom}
  ${borderRadius}
  ${borderColor}

  cursor: ${({ cursor }) => cursor};
`;