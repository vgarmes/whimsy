import styled from '@emotion/styled';
import { useState } from 'react';
import { COLORS, RAW_COLORS } from '../components/installer/constants';
import Installer from '../components/installer/Installer';
const InstallerPage = () => {
  const [runInstaller, setRunInstaller] = useState(false);
  return (
    <Wrapper>
      <button onClick={() => setRunInstaller(true)}>run installer</button>
      <WhimsicalWrapper>
        <Installer isRunning={runInstaller} width={420} />
      </WhimsicalWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background-image: linear-gradient(
    45deg,
    ${RAW_COLORS.blue[900]},
    ${RAW_COLORS.blue[800]}
  );
  border: 4px solid ${COLORS.textOnBackground};
  color: ${COLORS.textOnBackground};
  box-shadow: 0px 6px 60px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 0;
  user-select: none;
`;

const WhimsicalWrapper = styled.div`
  position: relative;
  width: 100%;
  /* Make sure it sits below the "Finished" overlay, when completed */
  z-index: 1;
`;

export default InstallerPage;
