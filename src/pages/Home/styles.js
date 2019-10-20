import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
max-width: 600px;
margin: 80px auto;
display: flex;

flex-direction: column;

header {
  display: flex;
  align-self: center
  align-items: center;
  padding-bottom: 100px;

  strong {
    color: #fff;
    font-size: 24px;
    margin: 0 15px;
  }
}

hr {
  border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0);
    margin: 10px 0 5px;
}

  a {
    width: 195px;
    display: flex;
    justify-content: center;
    align-self: center
    align-items: center;
    padding: 15px 15px 15px;
    margin: 5px 10px 0;
    height: 44px;
    background: #ff4500;
    font-weight: bold;
    color: #fff
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
      background: ${darken(0.2, '#ff4500')};
    }
    strong {
      color: #fff;
      font-size: 15px;
    }
  }
`;
