import styled from "styled-components";

export const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: cyan;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

export const StyledLabel = styled.label`
  display: block;
  margin: 10px 0px;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid grey")};
  font-size: medium;
`;

export const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
`;

export const StyledContainer = styled.div`
  display: flex;
  font-size: 10px;
  text-align: center;
  background-color: #cccaca;
  color: #000000;
  font-weight: bold;
  justify-content: space-between;
  width: 100%;
`;

export const StyledItem = styled.div`
  width: 150px;
  height: 60px;
  margin: 10px;
  text-align: center;

  line-height: 1.5;
`;
