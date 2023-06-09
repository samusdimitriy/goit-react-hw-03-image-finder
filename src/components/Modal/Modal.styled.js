import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: white; */
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  max-width: calc(100vw - 48px);
  width: 100%;
  max-height: calc(100vh - 24px);
  height: 100%;
  overflow: auto;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalImg = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;
