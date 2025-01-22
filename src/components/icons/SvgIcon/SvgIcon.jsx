import styled from 'styled-components';

const SvgIconStyled = styled.svg`
  user-select: none;
  width: 15px;
  height: 15px;
  display: inline-block;
  fill: currentColor;
`;

const SvgIcon = ({
  children,
  color = 'inherit',
  fontSize = 'inherit',
  viewBox = '0 0 24 24',
  ...props
}) => (
  <SvgIconStyled color={color} fontSize={fontSize} viewBox={viewBox} {...props}>
    {children}
  </SvgIconStyled>
);

export default SvgIcon;
