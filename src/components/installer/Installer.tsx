import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { FileData } from './types';
import { v4 as uuidv4 } from 'uuid';
import {
  generateFlightPath,
  getFolderPoint,
  getHeight,
  getPlanetPoint,
} from './helpers';

// Distance (from the center) for which the folder will open/close when a file
// approaches
const FOLDER_OPEN_RADIUS = 75;
const FOLDER_CLOSE_RADIUS = 25;
// Distance for which the folder will "inhale" nearby files
const FOLDER_GRAVITY_RADIUS = 50;

interface Props {
  width: number;
  isRunning?: boolean;
}

const Wrapper = styled.div<{ width: number }>`
  position: relative;
  display: flex;
  width: ${(props) => props.width}px;
  justify-content: space-between;
`;
const Installer: React.FC<Props> = ({ width, isRunning }) => {
  const wrapperNode = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<{ [id: string]: FileData }>({});
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  useEffect(() => {
    const createFile = () => {
      const height = getHeight(width);
      const fileId = uuidv4();

      const startPoint = getPlanetPoint(width);
      const endPoint = getFolderPoint(width);

      setFiles({
        ...files,
        [fileId]: {
          id: fileId,
          x: startPoint.x,
          y: startPoint.y,
          status: 'autonomous',
          size: height * 0.2,
          flightPath: generateFlightPath(width, height, startPoint, endPoint),
        },
      });
    };

    const updateFile = (fileId: string, properties: any) =>
      setFiles({ ...files, [fileId]: { ...files[fileId], ...properties } });

    const deleteFiles = (fileIds: string[]) => {
      const filesCopy = { ...files };
      fileIds.forEach((fileId) => delete filesCopy[fileId]);
      setFiles(filesCopy);
    };

    const fileGenerationLoop = () => {
      const fileIds = Object.keys(files);
      createFile();

      // Keep only the 2 most recent captured files
      const filesToDelete = fileIds
        .filter((id) => files[id].status === 'captured')
        .slice(0, -2);

      if (filesToDelete.length > 0) {
        deleteFiles(filesToDelete);
      }
    };
    const toggleRunning = () => {
      if (isRunning) {
        let wrapperBoundingBox = wrapperNode.current?.getBoundingClientRect();
      }
    };

    toggleRunning();

    // After a 2-4 second delay, generate another file!
    const delay = Math.random() * 2000 + 2000;
    const generationLoopId = window.setTimeout(fileGenerationLoop, delay);

    return () => {
      window.clearTimeout(generationLoopId);
      /* document.removeEventListener('mousemove', dragFile)
      document.removeEventListener('mouseup', releaseFile)
     
      window.cancelAnimationFrame(tickId) */
    };
  }, [isRunning, files, width]);
  return <Wrapper width={width} ref={wrapperNode}></Wrapper>;
};

export default Installer;
