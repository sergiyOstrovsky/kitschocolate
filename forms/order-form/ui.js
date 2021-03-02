import styled from 'styled-components';
import { width, display } from 'styled-system';
// forms
import { renderBorderColor } from './helpers';
// theme
import Theme from '../../theme';
// //////////////////////////////////////////////////

export const Input = styled.input`
  ${display}

  width: 100%;
  height: 40px;
  padding: 12px;
  font-size: 12px;
  border: 1px solid;
  background-color: ${Theme.colors.white};
  border-color: ${props => renderBorderColor(props)};

  &: focus {
    border-color: ${Theme.colors.blue};
  }
`;

export const Error = styled.div`
  left: 0;
  top: 100%;
  font-size: 11px;
  position: absolute;
  color: ${Theme.colors.inputErrorColor};
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  position: relative;
`;

export const Label = styled.label`
  ${width}
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  color: ${Theme.colors.lightSlateGrey};
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  font-size: 12px;
  resize: vertical;
  border: 1px solid;
  background-color: ${Theme.colors.white};
  border-color: ${Theme.colors.lightGrey};

  &: focus {
    border-color: ${Theme.colors.blue};
  }
`;
