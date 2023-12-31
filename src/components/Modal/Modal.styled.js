import styled from 'styled-components';
export const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;

  & .modal {
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 24px);
    border-radius: 5px;
    /* background-color: antiquewhite; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  & .modalClose {
    width: 30px;
    height: 30px;
    position: absolute;

    top: 15px;
    right: 15px;
    cursor: pointer;
  }
`;
